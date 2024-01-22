`solana config set --url devnet`

// Make sure you're on devnet.
`solana config get`

run:

`anchor build`

This will create a new build for us with a program id. We can access it by running:

`solana address -k target/deploy/web3_sol_program-keypair.json`

Now, go to `lib.rs`. You'll see this id at the top.

`declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");`

So, we need to change this program id in declare_id! to the one output by `solana address -k target/deploy/web3_sol_program-keypair.json`. Why? Well, the one anchor init gave us was just a placeholder. Now we'll have a program id we can actually deploy with!

Finally, once you do all this we need to run the build command again:

`anchor build`

Why? Because we want to actually build the project w/ our new program id! Anchor generates certain files upon a build under the target directory and we want to make sure those generated files have the latest and greatest program id.

run test before deployment
`anchor test`

`anchor deploy`

Basically we need to tell anchor to upload our idl for our program address

```bash
anchor idl init  -f target/idl/web3_sol_program.json `solana address -k target/deploy/web3_sol_program-keypair.json`

# anchor idl init  -f target/idl/web3_sol_program.json CoEMzqqpFTuzofY6Qxv993dXX8tbzBEJZDYzFinXphz2
# Idl account created: E8QgC2aNrDgacycjnDqNDQokgoHiHn2qXurmQaT2Qi5t
```

```bash
anchor idl upgrade -f target/idl/web3_sol_program.json `solana address -k target/deploy/web3_sol_program-keypair.json`
```

Please note that everytime you redeploy your solana program, you need to tell solana how your program api looks like, we can do so with `anchor idl upgrade` instead of `anchor idl init`


