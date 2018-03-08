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
    let receipt = await repository.deploy(50, 1, ["Person A", "Person B"])

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
