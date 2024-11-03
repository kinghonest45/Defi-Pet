# 🐕 Defi Puppy | Your Digital Friend

![defi-puppy](https://github.com/user-attachments/assets/3ef62c96-4512-4bc7-bea4-c9223f60cd23)

Deployed on AIA Testnet: https://testnet.aiascan.com/address/0x15A734df32E7b74EA7d16d52c65908989a327D1D

## Description

Introducing your new virtual companion: a Defi puppy that you can mint (3D NFT) and bring to life! Once minted, your Defi puppy can roam around your space, interact with you, and join in on various activities.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with this app, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/kinghonest45/Defi-Puppy
cd Defi-Puppy
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

## Future Ideas
- Introduce customizable options for a variety of pets.
- Add unique animations for each pet to enhance user engagement.
- Display the last feeding time and incorporate a feature where pets can potentially die if not fed, introducing a hunger mechanic.
- Implement a leveling system where pets start as babies (e.g., a puppy) and grow over time, reaching new stages of development (e.g., after 5-10 days of regular feeding, the pet matures).
- Add the ability to transfer pet ownership temporarily/permanently, allowing others to take care of pets if the owner is unavailable to feed them.

## License
This project is licensed under the terms specified in the [LICENCE.md](LICENCE.md) file.

