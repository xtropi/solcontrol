"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Grid } from "@/components/Grid";
import { ValidatorCard } from "@/components/ValidatorCard";
import {
  validators,
  testValidators,
  mainRecommended,
  testRecommended,
} from "@/mocks";
import { ThemeContext } from "@/providers/ThemeProvider";
import { SearchPanel } from "@/components/SearchPanel";
import { SearchContext } from "@/providers/SearchProvider";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  AccountInfo,
  Authorized,
  GetProgramAccountsResponse,
  Keypair,
  LAMPORTS_PER_SOL,
  Lockup,
  ParsedAccountData,
  PublicKey,
  StakeProgram,
  SystemProgram,
  Transaction,
  TransactionConfirmationStrategy,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { Button } from "@/components/Button";
require("@solana/wallet-adapter-react-ui/styles.css");
// const web3 = require("@solana/web3.js");

type ParsedProgramAccountsResponse = Array<{
  pubkey: PublicKey;
  account: AccountInfo<Buffer & ParsedAccountData>;
}>;

type ParsedStakeResponce = {
  pubkey: string;
  voteAccount: string;
  stake: number;
};

// import { theme } from "./theme";

const parseProgramAccounts = (
  data: ParsedProgramAccountsResponse
): ParsedStakeResponce[] => {
  // return data.map((item)=>(item.pubkey.toBase58()))
  return data.map((item) => ({
    pubkey: item.pubkey.toBase58(),
    voteAccount: item.account.data.parsed.info.stake.delegation.voter as string,
    stake: item.account.lamports,
  }));
};

export default function Home() {
  const [theme, setTheme] = useContext(ThemeContext);
  const [searchParams, setSearch] = useContext(SearchContext);
  const { connection } = useConnection();
  const { publicKey, sendTransaction, wallet } = useWallet();
  const [stakedValidators, setStakedValidators] = useState<
    ParsedStakeResponce[]
  >([]);

  const handleUnStake = () => {};
  const handleStake = async () => {
    if (!publicKey||!wallet) return;
    const stakeAccount = Keypair.generate();

    const minimumRent = await connection.getMinimumBalanceForRentExemption(
      StakeProgram.space
    );
    const amountUserWantsToStake = LAMPORTS_PER_SOL / 2; // This is can be user input. For now, we'll hardcode to 0.5 SOL
    const amountToStake = minimumRent + amountUserWantsToStake;

    const transaction = new Transaction().add(
      StakeProgram.createAccount({
        fromPubkey: publicKey,
        stakePubkey: stakeAccount.publicKey,
        lamports: amountToStake,
        lockup: new Lockup(0, 0, publicKey),
        authorized: new Authorized(publicKey, publicKey)
      })
    );
    
    const signature = await sendTransaction(transaction, connection);

    // const minContextSlot = connection.getLatestBlockhash()

    // await connection.confirmTransaction(signature, "processed");
    const strategy: TransactionConfirmationStrategy = {
      signature: signature, 
      nonceAccountPubkey: publicKey, 
      minContextSlot: transaction.lastValidBlockHeight!,
      nonceValue: transaction.nonceInfo!.nonce,
    }
  
    await connection.confirmTransaction(strategy, "processed");

    // Check our newly created stake account balance. This should be 0.5 SOL.
    let stakeBalance = await connection.getBalance(stakeAccount.publicKey);
    console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`);

    // Verify the status of our stake account. This will start as inactive and will take some time to activate.
    let stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
    console.log(`Stake account status: ${stakeStatus.state}`);
    
  };

  const promiseStakes = useCallback(async () => {
    if (!publicKey || !connection) return;
    return parseProgramAccounts(
      (await connection.getParsedProgramAccounts(StakeProgram.programId, {
        commitment: "confirmed",
        filters: [
          {
            memcmp: {
              offset: 44,
              bytes: publicKey.toBase58(),
            },
          },
        ],
      })) as ParsedProgramAccountsResponse
    );
  }, [connection, publicKey]);

  useEffect(() => {
    if (!publicKey) {
      setStakedValidators([]);
      return;
    }
    promiseStakes().then((data) => {
      if (!data) return;
      // connection.getVoteAccounts().then((voteAccountsRes)=>{
      //   const voteAccounts = voteAccountsRes.current.concat(voteAccountsRes.delinquent)
      // console.log(voteAccounts)
      // });
      setStakedValidators(data);
    });
  }, [publicKey]);

  useEffect(() => {
    console.log(stakedValidators);
  }, [stakedValidators]);

  // const filteredMyValidators = testValidators.data.filter((item) => {
  //   return stakedValidators
  //     .map((item) => item.voteAccount)
  //     .includes(item.voteId);
  // });

  const filteredMyValidators = stakedValidators.map((item) => {
    const linkedItem = testValidators.data.find(
      (item2) => item2.voteId === item.voteAccount
    );
    return { ...linkedItem, stake: item.stake };
  });

  const filteredAllValidators = testValidators.data
    // .slice(
    //   !searchParams.isRecommended ? 200 : undefined,
    //   !searchParams.isRecommended ? 300 : undefined
    // )
    .filter((item) => {
      const isEmpty = !item.name && (!item.website || !item.details);
      if (!searchParams.isRecommended) return !isEmpty;
      return !isEmpty && testRecommended.includes(item.validatorId);
    });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col sm:flex-row">
        <main className={`flex-1 bg-opacity-0 ${theme.pageBackground}`}>
          {filteredMyValidators.length > 0 && (
            <>
              <header className={`${theme.header} ${theme.shadow}`}>
                <h1 className="text-3xl font-bold">Your stakes</h1>
              </header>
              <div
                className={`overflow-y-auto px-4 mb-16 bg-opacity-0 ${theme.containerBackground}`}
              >
                <Grid>
                  {filteredMyValidators.map((validator: any, index: number) => (
                    <ValidatorCard key={index} data={validator} />
                  ))}
                </Grid>
              </div>
            </>
          )}

          {filteredAllValidators.length > 0 && (
            <>
              <header className={`${theme.header} ${theme.shadow}`}>
                <h1 className="text-3xl font-bold">Recommended</h1>
                <Button onClick={handleStake}>Stake</Button>
              </header>
              <div
                className={`overflow-y-auto px-4 bg-opacity-0 ${theme.containerBackground}`}
              >
                <Grid>
                  {filteredAllValidators.map(
                    (validator: any, index: number) => (
                      <ValidatorCard key={index} data={validator} />
                    )
                  )}
                </Grid>
              </div>
            </>
          )}
          <footer className={`${theme.footer} ${theme.shadow}`}>
            <p>Made with Smart Validator Toolkit API.</p>
            <p>© 2024 Mukh.tar</p>
          </footer>
        </main>

        <nav className={`order-first bg-opacity-0 ${theme.sidebars}`}>
          <SearchPanel />
        </nav>
        {/* <aside className={`${theme.sidebars}`}></aside> */}
      </div>
    </div>
  );
}
