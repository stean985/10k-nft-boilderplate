# Launching a 10K NFT collection on the Core Network

## Pre-requisites
Following are the pre-requisites tools that you'll need: 
- [Node.js](https://nodejs.org/) 
- [Visual Studio Code (VSCode)](https://visualstudio.microsoft.com/) 
- [Git](https://git-scm.com/)
- [Metamask](https://metamask.io/)

## Configure Git CLI
- Open your favorite terminal.
- Run `gh --version` to ensure that you have installed the Git CLI successfully.
- Run `gh auth login --web` in your terminal and follow the steps given below:
  - First, it will ask for your preferred protocol for Git operations. I chose HTTPS, you can choose any.
  - Second, it will ask you to Authenticate Git with your GitHub credentials, and type Y.
  - Third, you will be able to see some code on your terminal. Copy it.
  - Then, press Enter. It will open a window in your browser.
  - Paste the code you copied and authorize your git. You might need to enter your GitHub password if you have yet to log in.

## Contract Deployment

- Fork and clone the repo by running `gh repo fork https://github.com/0xmetaschool/10k-nft-boilderplate.git --clone `.
- Navigate into the folder using `cd 10k-nft-boilderplate/backend`.
- Install dependencies by running `npm install`.
- Create **.env** file and place your Private Key inside it.
- Run `npx hardhat compile` to compile.
- Run `npx hardhat ignition deploy ./ignition/modules/NFT.js --network core_testnet` to deploy.

## Frontend Setup

- Navigate to react app by running `cd ../frontend ` if you are in the backend folder.
- Install dependencies using `npm install`.
- Copy the .json files containing the ABI from _./artifacts/contracts_. You'll need to copy the `CoreNFT.json` file to `interface/src/ABI/` folder.
- Run the frontend using `npm  start`.
