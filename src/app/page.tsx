"use client";
import {
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
  Keypair,
  LAMPORTS_PER_SOL,
  Lockup,
  ParsedAccountData,
  PublicKey,
  StakeProgram,
} from "@solana/web3.js";
import { Button } from "@/components/Button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Spinner } from "@/components/Spinner";
import { Modal } from "@/components/Modal";
require("@solana/wallet-adapter-react-ui/styles.css");

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
  return data
    .filter((item) => item.account.data.parsed.type === "delegated")
    .map((item) => ({
      pubkey: item.pubkey.toBase58(),
      voteAccount: item.account.data.parsed.info.stake.delegation
        .voter as string,
      stake: item.account.lamports,
    }));
};

const RANDOM = Math.random();

export default function Home() {
  const [theme, setTheme] = useContext(ThemeContext);
  const [searchParams, setSearch] = useContext(SearchContext);
  const { connection } = useConnection();
  const { publicKey, sendTransaction, wallet } = useWallet();
  const [stakedValidators, setStakedValidators] = useState<
    ParsedStakeResponce[]
  >([]);
  const [isLoading, setLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [balance, setBalance] = useState<number | undefined>();
  const [amount, setAmount] = useState(1);
  const [filteredAllValidators, setFilteredAllValidators] = useState<any>([]);

  const fetchValidators = useCallback(() => {
    if (!publicKey) {
      setStakedValidators([]);
      return;
    }
    setLoading(true);
    promiseStakes()
      .then((data) => {
        if (!data) return;
        // connection.getVoteAccounts().then((voteAccountsRes)=>{
        //   const voteAccounts = voteAccountsRes.current.concat(voteAccountsRes.delinquent)
        // console.log(voteAccounts)
        // });
        setStakedValidators(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [publicKey, setStakedValidators]);

  const handleUnstake = () => {};
  const handleStake = async (value: string, amount: number) => {
    if (!publicKey || !wallet) return;
    try {
      setLoading(true);
      const stakeAccount = new Keypair();
      const votePubkey = new PublicKey(value);

      const minimumRent = await connection.getMinimumBalanceForRentExemption(
        StakeProgram.space
      );
      // This is can be user input. For now, we'll hardcode to 1 SOL - Testnet minimum
      const amountUserWantsToStake = LAMPORTS_PER_SOL * amount;
      const amountToStake = minimumRent + amountUserWantsToStake;
      const crtx = StakeProgram.createAccount({
        fromPubkey: publicKey,
        stakePubkey: stakeAccount.publicKey,
        lamports: amountToStake,
        lockup: new Lockup(0, 0, publicKey),
        authorized: new Authorized(publicKey, publicKey),
      });

      const createStakeSignature = await sendTransaction(crtx, connection, {
        signers: [stakeAccount],
      });

      console.log(createStakeSignature);

      const conftx = await connection.confirmTransaction(
        createStakeSignature,
        "processed"
      );
      console.log(conftx);

      // Check our newly created stake account balance. This should be 0.5 SOL.
      let stakeBalance = await connection.getBalance(stakeAccount.publicKey);
      console.log(
        `Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`
      );

      const delegateTx = StakeProgram.delegate({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: publicKey,
        votePubkey: votePubkey,
      });

      const delegateSignature = await sendTransaction(delegateTx, connection);

      console.log(
        `Stake account delegated to ${votePubkey}. Tx Id: ${delegateSignature}`
      );

      fetchValidators();
    } catch (e) {
      console.log("ERROR:");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleModalAccept = async () => {
    setModal(false);
    const amountPerEach = amount / filteredAllValidators.length;
    // Min amount check
    if (balance && amountPerEach < 1 && amount < balance) {
      console.log("Min amount check failed.");
      return;
    }
    for (let item of filteredAllValidators) {
      await handleStake(item.voteId, amountPerEach);
    }
  };
  const handleModalCancel = () => {
    setModal(false);
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
    if (!publicKey) return;
    connection.getBalance(publicKey).then((res) => {
      setBalance(res);
    });
    fetchValidators();
  }, [publicKey]);

  useEffect(() => {
    console.log(stakedValidators);
  }, [stakedValidators]);
  useEffect(() => {
    const slicePart = 20;
    const sliceFrom = RANDOM * (testValidators.data.length - slicePart);
    const sliceTo = sliceFrom + slicePart;
    const newFiltered = testValidators.data
    .slice(
      !searchParams.isRecommended ? sliceFrom : undefined,
      !searchParams.isRecommended ? sliceTo : undefined
    )
    .filter((item) => {
      const isEmpty = !item.name && (!item.website || !item.details);
      if (!searchParams.isRecommended) return !isEmpty;
      return !isEmpty && testRecommended.includes(item.validatorId);
    })
    setFilteredAllValidators(newFiltered)
    setAmount(newFiltered.length)
  }, [searchParams.isRecommended]);

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

  const handleStakeButton = async () => {
    setModal(true);
  };
  const handleAmountChange: ChangeEventHandler<HTMLInputElement> = (_event) => {
    setAmount(parseInt(_event.currentTarget.value));
  };

  // useEffect(()=>{console.log(amount)}, [amount])
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col sm:flex-row">
        <main className={`flex-1 bg-opacity-0 ${theme.pageBackground}`}>
          <header className={`${theme.header} ${theme.shadow}`}>
            <div className="flex">
              {isLoading && <Spinner className="mt-2 mb-2 mr-4 " />}
              <h1 className="text-3xl font-bold mr-8 mt-1">Your stakes</h1>
              <WalletMultiButton />
              {balance && (
                <h3 className="flex text-xl ml-16 mt-2 ">
                  Balance:
                  <div className="dark:text-green-300 mx-2">
                    {(balance / LAMPORTS_PER_SOL).toFixed(4)}
                  </div>
                  SOL
                </h3>
              )}
            </div>
          </header>
          {filteredMyValidators.length > 0 && (
            <div
              className={`overflow-y-auto px-4 mb-16 bg-opacity-0 ${theme.containerBackground}`}
            >
              <Grid>
                {filteredMyValidators.map((validator: any, index: number) => (
                  <ValidatorCard key={index} data={validator} />
                ))}
              </Grid>
            </div>
          )}

          {filteredAllValidators.length > 0 && (
            <>
              <header className={`${theme.header} ${theme.shadow}`}>
                <div className="flex">
                  <h1 className="text-3xl font-bold mr-4 mt-2">
                    {searchParams.isRecommended
                      ? "Recommended"
                      : "Absolute random"}
                  </h1>
                  {wallet?.readyState && balance && (
                    <>
                      <Button onClick={handleStakeButton} loading={isLoading}>
                        Make a Stake
                      </Button>
                      <div className="ml-8">
                        <label
                          htmlFor="minmax-range"
                          className="flex mb-2 mx-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Amount:{" "}
                          {
                            <div className="mx-1 dark:text-green-300">
                              {amount}
                            </div>
                          }{" "}
                          SOL
                        </label>
                        <input
                          id="minmax-range"
                          type="range"
                          min={filteredAllValidators.length}
                          onChange={handleAmountChange}
                          max={Math.floor(balance / LAMPORTS_PER_SOL)}
                          value={amount}
                          className="w-64 h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        ></input>
                      </div>
                    </>
                  )}
                </div>
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
        {isModal && (
          <Modal onAccept={handleModalAccept} onCancel={handleModalCancel} />
        )}
        {/* <aside className={`${theme.sidebars}`}></aside> */}
      </div>
    </div>
  );
}
