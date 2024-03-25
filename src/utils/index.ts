public async verifyBalance(lamportToSend: number, walletPubkey: PublicKey, transaction: Transaction) {
    const balance = await this.solanaUtilsService.connection.getBalance(walletPubkey);
    const txFee = (await this.solanaUtilsService.connection.getFeeForMessage(
      transaction.compileMessage(),
      'confirmed',
    )).value;
    const balanceCheck = lamportToSend < balance + txFee ? true : false;
    if (!balanceCheck) {
      this._formatErrors({ message: 'not enogh balance' })
      // throw new Error('not enogh balance')
      return false;
    }
     return balanceCheck
    }
    
    private async prepTx(lamports, tx, walletOwnerPk: PublicKey) {
    // verify tx fee
    const { blockhash } = await this.solanaUtilsService.connection.getLatestBlockhash();
    const txVerify = new Transaction().add(tx)
    txVerify.recentBlockhash = blockhash;
    txVerify.feePayer = walletOwnerPk
    
    const hasBalance = await this.verifyBalance(lamports, walletOwnerPk, txVerify)
    if (hasBalance) {
      return true
    } else {
      return false
    }

    public async delegate(lamportsToDelegate: number, walletOwnerPk: PublicKey, validatorVoteKey: string) {
        const createStakeAccount = async (lamportToSend: number, stakeAccountOwner: PublicKey) => {
          const minimumAmount = await this.solanaUtilsService.connection.getMinimumBalanceForRentExemption(
            StakeProgram.space,
          );
          const fromPubkey = stakeAccountOwner;
          const newStakeAccount = new Keypair();
          const authorizedPubkey = stakeAccountOwner;
          const authorized = new Authorized(authorizedPubkey, authorizedPubkey);
          const lockup = new Lockup(0, 0, fromPubkey);
          const lamports = minimumAmount + lamportToSend;
          const stakeAccountIns: CreateStakeAccountParams = {
            fromPubkey,
            stakePubkey: newStakeAccount.publicKey,
            authorized,
            lockup,
            lamports
          }
          const newStakeAccountIns = StakeProgram.createAccount(stakeAccountIns)
          return { newStakeAccountIns, newStakeAccount }
        }
        try {
          const stakeAccountData = await createStakeAccount(lamportsToDelegate, walletOwnerPk)
          const stakeAcc: Keypair = stakeAccountData.newStakeAccount;
          const instruction: DelegateStakeParams = {
            stakePubkey: stakeAcc.publicKey,
            authorizedPubkey: walletOwnerPk,
            votePubkey: new PublicKey(validatorVoteKey)
          }
          const stakeAccIns: Transaction = stakeAccountData.newStakeAccountIns;
          const delegateTX: Transaction = StakeProgram.delegate(instruction);
        
          const stake: Transaction[] = [stakeAccIns, delegateTX]
          const validTx = await this.prepTx(lamportsToDelegate,delegateTX, walletOwnerPk)
        
        
          if (validTx) {
            this.sendTx(stake, walletOwnerPk, [stakeAcc])
          }
        } catch (error) {
          console.log(error)
        }


        private async sendTx(txParam: TransactionInstruction[] | Transaction[], walletPk: PublicKey, extraSigners?: Keypair[]) {
            try {
              const { lastValidBlockHeight, blockhash } = await this.solanaUtilsService.connection.getLatestBlockhash();
              const txArgs: TransactionBlockhashCtor = { feePayer: walletPk, blockhash, lastValidBlockHeight: lastValidBlockHeight }
              let transaction: Transaction = new Transaction(txArgs).add(...txParam);
              // this._walletStore.signTransaction(transaction);
              this._walletStore.signTransaction(transaction).subscribe({
                next: async (res: Transaction) => {
            
                  if (extraSigners) transaction.partialSign(...extraSigners);
            
                  //LMT: check null signatures
                  for (let i = 0; i < transaction.signatures.length; i++) {
                    if (!transaction.signatures[i].signature) {
                      throw Error(`missing signature for ${transaction.signatures[i].publicKey.toString()}. Check .isSigner=true in tx accounts`)
                    }
                  }
            
                  const rawTransaction = transaction.serialize({ requireAllSignatures: false });
                  const signature = await this.solanaUtilsService.connection.sendRawTransaction(rawTransaction);
                  console.log('https://solscan.io/tx/' + signature)
                  const txSend: toastData = {
                    message: 'transaction subbmitted',
                    icon: 'information-circle-outline',
                    segmentClass: "toastInfo"
                  }
                  this.toasterService.msg.next(txSend)
                  const config: BlockheightBasedTransactionConfirmationStrategy = {
                    signature, blockhash, lastValidBlockHeight: res.lastValidBlockHeight//.lastValidBlockHeight
                  }
                  await this.solanaUtilsService.connection.confirmTransaction(config) //.confirmTransaction(txid, 'confirmed');
                  const txCompleted: toastData = {
                    message: 'transaction completed',
                    icon: 'information-circle-outline',
                    segmentClass: "toastInfo"
                  }
                  this.toasterService.msg.next(txCompleted)
                },
                error: (err) => {
                  this._formatErrors(err)
                },
              })
            
            } catch (error) {
              console.log(error)
              // onMsg('transaction failed', 'error')
            }