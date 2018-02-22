# About
This tutorial will guide you to create a local Angular application that can talk to any Smart Contract. It uses the Uforia compiler to compile the Solidity into TypeScript which can be leveraged by the Angular app.

# Installation

Only required once. :)

## Visual Studio Code - Uforia extension
This sample uses Visual Studio Code. Please install the Uforia extension.

https://marketplace.visualstudio.com/items?itemName=QNH.uforia

## Install NPM

https://www.npmjs.com/get-npm

## Install the Angular CLI

https://github.com/angular/angular-cli#installation

Run `npm install -g @angular/cli` 

# Setup

## Angular

First we create a new Angular application using the CLI. Run `ng new my-app` where `my-app` is the application name, so be creative. After the CLI has completed, you can check if everything is working by running the following commands;

1. Run `cd my-app`
2. Run `ng serve -o`

You should now see a browser window with some boilerplate angular application.

Also now would be a good moment to open the my-app directory in VS Code. :)

## NPM packages

To talk to the Ethereum network we need the Web3 library. We found that the following actions work best.

Add `"web3": "github:ethereum/web3.js"` entry as a dependency to the `package.json` file and run `npm install`. 

*...npm install will take a while, its normal*

## Start the Uforia extension

Use `CTRL + SHIFT + P` -> `Uforia - Start` to launch the compiler filewatcher.

## Solidity Smart contracts

Now we will add the Smart contract. You can choose any contract you wish, for the demo we will use the `Voting.sol` sample. Avaiable here: https://github.com/maheshmurthy/ethereum_voting_dapp/blob/master/chapter3/contracts/Voting.sol

Create the `contracts` folder in `my-app/src/` and add your `Voting.sol` file. On save, the compiler should add the following files. Note, this can vary if you have different contracts.

- Voting.ts
- Uforeum.ts
- bignumber.d.ts

**NOTE: Please check if the `./Uforeum` import in the `Voting.ts` file is being resolved properly**

## Integration

Now we have the contract compiled, and the Angular application ready, we need to integrate them. We do this by adding some code to actually deploy our contract and talk to it.

*Depending on your contract, some classes might change, especially those imported from your compiled contract.*
*Please note that this is sample code. In an actual application we would leverage OnInit, but that is Angular specific so I will not cover that part in this tutorial.*


**/src/app/app.component.ts**
```ts
import { Component, OnInit } from '@angular/core';
import { IVotingVoterDetailsResponse, IVotingVoterInfoResponse, Voting, VotingRepository } from './../contracts/Voting'
import Web3 = require('web3');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contract: Voting;
  title = 'app';

  async ngOnInit() {

    var web3 = new Web3(
      // First we connect to TestRPC, for actual Ethereum network this would change.
      new Web3.providers.HttpProvider('http://localhost:8545')
    );

    // As we do not have a wallet installed, we need to specify an address 
    // from which we are going to fund the transactions
    web3.eth.defaultAccount = web3.eth.accounts[0];

    // Create the repository passing web3
    let repository = new VotingRepository(web3)

    // Deploy the actual contract to the blockchain.
    // In actual application you can delay the point of deployment to support use-cases.
    let receipt = repository.deploy(50, 1, ["Person A", "Person B"])

    // Try to get the deployed contract. This can take a while, see below. TestRPC should be instant.
    this.contract = receipt.getDeployed();

    // To get a deployed contract by address you can pass the address to the getDeployed() method.
    //this.contract = receipt.getDeployed(address);

    // On the actual Ethereum network this operation can take some time, so we wait.
    while (this.contract === undefined) {
      console.log("Waiting for deployment...");
      this.contract = receipt.getDeployed();
    }


    // From this point we can interact with the deployed contract
    let totalTokens = await this.contract.totalTokens();

    // In the constructor we put in 50 tokens, so the result should be 50. :)
    alert("Total tokens should be 50 and are: " + totalTokens);
  }
}

```

 ## Test it!!

Start the TestRPC service. Run `testrpc`.

Start the webserver. Run `ng serve -o`

## Patry trick - hot reloading

You can also leverage the Hot Reloading feature that the Angular CLI brings. By saving the .sol file, it generates the .ts file which causes a reload in the browser when using `ng serve`. This should also speed up development! 

