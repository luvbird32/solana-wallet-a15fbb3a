
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { WalletProgram } from "../target/types/wallet_program";
import { expect } from "chai";

describe("wallet-program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.WalletProgram as Program<WalletProgram>;
  const owner = anchor.web3.Keypair.generate();

  it("Initializes a wallet", async () => {
    const [walletPda, bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("wallet"), owner.publicKey.toBuffer()],
      program.programId
    );

    // Airdrop SOL to owner for transaction fees
    await program.provider.connection.confirmTransaction(
      await program.provider.connection.requestAirdrop(
        owner.publicKey,
        2 * anchor.web3.LAMPORTS_PER_SOL
      )
    );

    await program.methods
      .initializeWallet(bump)
      .accounts({
        wallet: walletPda,
        owner: owner.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([owner])
      .rpc();

    const walletAccount = await program.account.wallet.fetch(walletPda);
    expect(walletAccount.owner.toString()).to.equal(owner.publicKey.toString());
    expect(walletAccount.transactionCount.toNumber()).to.equal(0);
  });

  it("Gets wallet info", async () => {
    const [walletPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("wallet"), owner.publicKey.toBuffer()],
      program.programId
    );

    const walletInfo = await program.methods
      .getWalletInfo()
      .accounts({
        wallet: walletPda,
      })
      .view();

    expect(walletInfo.owner.toString()).to.equal(owner.publicKey.toString());
    expect(walletInfo.transactionCount.toNumber()).to.equal(0);
  });
});
