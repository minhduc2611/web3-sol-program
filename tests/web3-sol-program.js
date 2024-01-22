const anchor = require("@project-serum/anchor");
// solana-keygen new
// Wrote new keypair to /Users/mac/.config/solana/id.json
// ===============================================================================
// pubkey: 2Q4BFVoGDHfM6BE1ZNr3VSLfUdZWunUByajQ9dqDW373
// ===============================================================================
// Save this seed phrase and your BIP39 passphrase to recover your new keypair:
// chair strong glad arctic tongue funny explain narrow room wheel harvest mansion
// ===============================================================================


/**
 * [102,134,146,208,21,168,61,185,157,97,7,102,1,24,88,100,148,188,102,61,239,165,124,188,23,216,71,133,190,197,66,165,20,195,163,49,15,63,169,196,111,167,120,22,161,102,1,60,171,7,112,145,41,0,30,15,191,94,31,49,23,115,112,238]
 */

// describe("web3-sol-program", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const program = anchor.workspace.Web3SolProgram;
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });

// Need the system program, will talk about this soon.
const { SystemProgram } = anchor.web3;
const main = async () => {
  console.log("🚀 Starting test...");

  // Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Web3SolProgram;

  // Create an account keypair for our program to use.
  // basically it's because we need to create some credentials for the BaseAccount we're creating. In order to store data. every thing is accounts, remmember
  const baseAccount = anchor.web3.Keypair.generate();

  // Call start_stuff_off, pass it the params it needs! Remote procedure call
  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("📝 Your transaction signature", tx);

  // Fetch data from the account.
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count", account.totalGifs.toString());

  // You'll need to now pass a GIF link to the function! You'll also need to pass in the user submitting the GIF!
  await program.rpc.addGif("insert_a_giphy_link_here", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  // Call the account.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count", account.totalGifs.toString());

  // Access gif_list on the account!
  console.log("👀 GIF List", account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
