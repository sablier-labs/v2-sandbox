![Sablier V2 Sandbox](/packages/assets/banner.png)

# Sablier V2 Sandbox

Front-end sandbox development environments for Sablier V2.

## Background

Sablier is a smart contract protocol that enables trustless streaming of ERC-20 assets, which means
the ability to make payments by the second.

There are two types of streaming models in Sablier:

- **LockupLinear**, abbreviated as **LL**, which creates streams with linear streaming functions
- **LockupDynamic**, abbreviated as **LD**, which creates streams with dynamic streaming functions (examples: exponentials, logarithms, step functions)

For more information, please refer to our [documentation](https://docs.sablier.com).

It is worth noting that you can charge a service fee when creating a stream. This fee is a percentage of the stream's total value and is paid to your designated broker address. Check out the "broker" references in the code to see how this works, as well as this [guide](https://docs.sablier.com/concepts/protocol/fees) from our docs.

## Environments and Examples

### Ethers V6

An integration of the [Sablier V2 Core](https://github.com/sablier-labs/v2-core) contracts into a frontend environment that uses [Ethers V6](https://docs.ethers.org/v6/). It's a small app that runs on the Goerli testnet and provides a wallet connection out of the box (Injected / Metamask).

| Lockup Linear (Form)                       | Lockup Dynamic (Form)                       | Headless                             |
| ------------------------------------------ | ------------------------------------------- | ------------------------------------ |
| ![LL](./packages/assets/lockup-linear.png) | ![LD](./packages/assets/lockup-dynamic.png) | ![H](./packages/assets/headless.png) |

#### Features

- Create a LL stream with Durations using the UI Form
- Create a LD stream with Deltas using the UI Form
- Create a LL stream with Durations in headless mode (tweak durations in code)
- Create a LL stream with Range in headless mode (tweak dates/ranges in code)
- Create a LD stream with Deltas in headless mode (tweak deltas in code)
- Create a LD stream with Milestones in headless mode (tweak milestones in code)
- Mint [testnet DAI](https://goerli.etherscan.io/token/0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862) tokens
- Approve spending DAI tokens for both the LL and LD contracts

Most of the transaction magic happens in [`models/Transaction.ts`](/examples/ethers-v6/src/models/Transaction.ts). Have a look to understand how parameters are formatted (strings to Big Int, padding numbers with decimals, etc.) and sent to the contracts.

For the **headless** mode, see [`constants/data.ts`](/examples/ethers-v6/src/constants/data.ts). Here, you'll be able to tweak the parameters to create streams of different values or shapes (segments).

#### Next steps

In the UI Forms, you may find `Prefill form` buttons. Clicking on them will add pre-configured data into the fields as an example of what the data should look like.

After you create a test stream, make sure to connect to our main [app.sablier.com](https://app.sablier.com) interface with your "sender" wallet to see what the stream [actually looks like](https://docs.sablier.com/apps/features#detailed-panels).

| Payload (LD with two segments)            | Shape                                      |
| ----------------------------------------- | ------------------------------------------ |
| ![E](./packages/assets/emission-code.png) | ![E](./packages/assets/emission-shape.png) |

### Viem / Wagmi

While not yet implemented in a bespoke sandbox, we strongly recommend using [wagmi](wagmi.sh/) and [viem](https://viem.sh/) for building your web3 app. The official Sablier interface uses these two libraries.

To understand how the API changes between ethers and the wagmi stack, see this [migration](https://wagmi.sh/react/ethers-adapters) guide.
