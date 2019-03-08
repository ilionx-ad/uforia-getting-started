import { ITransactionObject, OnCompletedCallback, IContractDeploymentReceipt, IError } from "./Uforeum";


/** Ballot Ethereum smart contract repository. */
class BallotRepository {
	private abi: any = JSON.parse('[{"constant":false,"inputs":[{"name":"proposal","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"name","type":"bytes32"},{"name":"voteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"chairperson","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"winningProposal","outputs":[{"name":"winner","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"voter","type":"address"}],"name":"giveRightToVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"weight","type":"uint256"},{"name":"voted","type":"bool"},{"name":"delegate","type":"address"},{"name":"vote","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"winnerName","outputs":[{"name":"name","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"proposalNames","type":"bytes32[]"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name","type":"bytes32"},{"indexed":false,"name":"voteCount","type":"uint256"}],"name":"Voted","type":"event"}]');
	private bin: string = '0x6080604052604051610c7d380380610c7d8339810180604052602081101561002657600080fd5b81019080805164010000000081111561003e57600080fd5b8281019050602081018481111561005457600080fd5b815185602082028301116401000000008211171561007157600080fd5b505092919050505060028151101515156100f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f70726f706f73616c4e616d657320636f756e74203c203200000000000000000081525060200191505060405180910390fd5b601481511115151561016d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f70726f706f73616c4e616d657320636f756e74203e203230000000000000000081525060200191505060405180910390fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555060008090505b81518110156102a25760026040805190810160405280848481518110151561023f57fe5b9060200190602002015181526020016000815250908060018154018082558091505090600182039060005260206000209060020201600090919290919091506000820151816000015560208201518160010155505050808060010191505061021b565b50506109ca806102b36000396000f3fe608060405234801561001057600080fd5b50600436106100a5576000357c010000000000000000000000000000000000000000000000000000000090048063609ff1bd11610078578063609ff1bd146101af5780639e7b8d61146101cd578063a3ec138d14610211578063e2ba53f0146102ae576100a5565b80630121b93f146100aa578063013cf08b146100d85780632e4176cf146101215780635c19a95c1461016b575b600080fd5b6100d6600480360360208110156100c057600080fd5b81019080803590602001909291905050506102cc565b005b610104600480360360208110156100ee57600080fd5b8101908080359060200190929190505050610408565b604051808381526020018281526020019250505060405180910390f35b61012961043b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101ad6004803603602081101561018157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610460565b005b6101b761074b565b6040518082815260200191505060405180910390f35b61020f600480360360208110156101e357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506107c6565b005b6102536004803603602081101561022757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610912565b60405180858152602001841515151581526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200194505050505060405180910390f35b6102b661096f565b6040518082815260200191505060405180910390f35b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff1615151561032d57600080fd5b60018160010160006101000a81548160ff021916908315150217905550818160020181905550806000015460028381548110151561036757fe5b9060005260206000209060020201600101600082825401925050819055507f4c45019fcc4a4dac418427a5d21c1c9c46e29299a14c15e97f0d78ab087b34706002838154811015156103b557fe5b9060005260206000209060020201600001546002848154811015156103d657fe5b906000526020600020906002020160010154604051808381526020018281526020019250505060405180910390a15050565b60028181548110151561041757fe5b90600052602060002090600202016000915090508060000154908060010154905082565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff161515156104c157600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515156104fc57600080fd5b5b600073ffffffffffffffffffffffffffffffffffffffff16600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561063a57600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561063557600080fd5b6104fd565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff161561072f5781600001546002826002015481548110151561070c57fe5b906000526020600020906002020160010160008282540192505081905550610746565b816000015481600001600082825401925050819055505b505050565b6000806000905060008090505b6002805490508110156107c1578160028281548110151561077557fe5b90600052602060002090600202016001015411156107b45760028181548110151561079c57fe5b90600052602060002090600202016001015491508092505b8080600101915050610758565b505090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614801561086f5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16155b80156108bd57506000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154145b15156108c857600080fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555050565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905084565b6000600261097b61074b565b81548110151561098757fe5b90600052602060002090600202016000015490509056fea165627a7a72305820b79cdea7ce28be4e170fe2e4bd341145b21f8fef402cad41b6f07706ae5226810029';

	constructor(private web3: any){
		if(web3 === undefined){
			throw "Undefined web3 parameter in BallotRepository contructor";
		}
	}

	private tryAtMost(tries, executor) {
		--tries;
		return new Promise(executor)
			.catch(err => tries > 0 ?
				this.tryAtMost(tries, executor)
				: Promise.reject(err));
	}

	getDeployed(address:string) : Ballot {
		const contract : any = this.web3.eth.contract(this.abi);
		return new Ballot(contract.at(address), this.web3, this.abi, this.bin);
	}
	
	async deploy(proposalNames: string[], value: number, ) : Promise<IContractDeploymentReceipt<Ballot>>  {	
		let contract : any = this.web3.eth.contract(this.abi);
		 
		var ctorData = contract.new.getData(proposalNames, {data: this.bin });
		var estimate = this.web3.eth.estimateGas({data: ctorData});
		const response = contract.new(proposalNames, {
			data: this.bin,
			gas: estimate, 
			from: this.web3.eth.defaultAccount
		});
				
		let receipt = await this.tryAtMost(150, (resolve, reject) => {
			let r = this.web3.eth.getTransactionReceipt(response.transactionHash);
			(r == null) ? setTimeout(() => { reject(); }, 1000) : resolve(r);
		});

		return {
			transactionHash: response.transactionHash,
			transactionIndex: receipt.transactionIndex,
			blockHash: receipt.blockHash,
			blockNumber: receipt.blockNumber,
			contractAddress: receipt.contractAddress,
			cumulativeGasUsed: receipt.cumulativeGasUsed,
			getDeployed: () => {
				if (receipt && receipt.contractAddress) {
					console.log("Your contract has been deployed at " + receipt.contractAddress);
					console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");	
					contract = this.web3.eth.contract(this.abi);
					return new Ballot(contract.at(receipt.contractAddress), this.web3, this.abi, this.bin);					
				}
				return undefined;
			}
		};	
	}
}


 	
/** EventArgs for Voted. */
interface VotedEventArgs{
	name: string;
	voteCount: number;
};
 

class Ballot{
	public address: string;

	constructor(private innerProxy: any, private web3: any, private abi: any, private bin: string){
		this.address = innerProxy.address;
	}

	private getTransactionReceiptMined(txHash, interval) {
		let self = this;
		const transactionReceiptAsync = function (resolve, reject) {
			self.web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
				if (error) {
					reject(error);
				} else if (receipt == null) {
					setTimeout(
						() => transactionReceiptAsync(resolve, reject),
						interval ? interval : 500);
				} else {
					console.log("Transaction mined", txHash);
					resolve(receipt);
				}
			});
		};

		if (Array.isArray(txHash)) {
			return Promise.all(txHash.map(
				oneTxHash => self.getTransactionReceiptMined(oneTxHash, interval)));
		} else if (typeof txHash === "string") {
			return new Promise(transactionReceiptAsync);
		} else {
			throw new Error("Invalid Type: " + txHash);
		}
	};

	 		
	/** Voted (Pure). */
	VotedEvent(callback: OnCompletedCallback<VotedEventArgs>) : void {
		let event = this.innerProxy.Voted();
		event.watch((error, result) => {
			callback(error, result.args);
		});
	}
	
	 	
	/** proposals (View). */
	proposals(i: number) : IBallotProposalsResponse{  
		let response = this.innerProxy.proposals.call(i);
		return {name: this.web3.toAscii(response[0]).replace(/\u0000/g, ''), voteCount: response[1]};  
	}

	/** proposals (View). */
	proposalsAsync(i: number) : Promise<IBallotProposalsResponse>{
		return new Promise<IBallotProposalsResponse>((resolve, reject) => {
			try {
				this.innerProxy.proposals.call(i, (error, result) => {
					if (error)
						reject(error); 
					resolve({name: this.web3.toAscii(result[0]).replace(/\u0000/g, ''), voteCount: result[1]});
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}  	
	/** chairperson (View). */
	chairperson() : string{  
		var result = this.innerProxy.chairperson.call(); 
		return result; 
	}

	/** chairperson (View). */
	chairpersonAsync() : Promise<string>{
		return new Promise<string>((resolve, reject) => {
			try {
				this.innerProxy.chairperson.call((error, result) => {
					if (error)
						reject(error); 
					resolve(result);
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}  	
	/** winningProposal (View). */
	winningProposal() : number{  
		var result = this.innerProxy.winningProposal.call(); 
		return result; 
	}

	/** winningProposal (View). */
	winningProposalAsync() : Promise<number>{
		return new Promise<number>((resolve, reject) => {
			try {
				this.innerProxy.winningProposal.call((error, result) => {
					if (error)
						reject(error); 
					resolve(result);
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}  	
	/** voters (View). */
	voters(i: string) : IBallotVotersResponse{  
		let response = this.innerProxy.voters.call(i);
		return {weight: response[0], voted: response[1], delegate: response[2], vote: response[3]};  
	}

	/** voters (View). */
	votersAsync(i: string) : Promise<IBallotVotersResponse>{
		return new Promise<IBallotVotersResponse>((resolve, reject) => {
			try {
				this.innerProxy.voters.call(i, (error, result) => {
					if (error)
						reject(error); 
					resolve({weight: result[0], voted: result[1], delegate: result[2], vote: result[3]});
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}  	
	/** winnerName (View). */
	winnerName() : string{  
		var result = this.innerProxy.winnerName.call(); 
		return this.web3.toAscii(result).replace(/\u0000/g, ''); 
	}

	/** winnerName (View). */
	winnerNameAsync() : Promise<string>{
		return new Promise<string>((resolve, reject) => {
			try {
				this.innerProxy.winnerName.call((error, result) => {
					if (error)
						reject(error); 
					resolve(this.web3.toAscii(result).replace(/\u0000/g, ''));
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}  

	 	
	/** vote (NonPayable). */
	vote(proposal: number) : Promise<void>{
			return new Promise<void>((resolve, reject) => {
			try {
				console.log("Sending transaction Ballot.vote"); 
				const callback = async (error, txId) => { console.log("Transaction submitted for Ballot.vote"); if (error) {reject(error);} resolve(await this.getTransactionReceiptMined(txId, 500)); };  
				const gas = 127982;  
				const trn = { gas: gas, from: this.web3.eth.defaultAccount };
				return this.innerProxy.vote.sendTransaction(proposal, trn, callback);  
			}
			catch (err) {
				console.error("Ballot.vote: " + err);
				reject(err);
			}
		});
	}  	
	/** delegate (NonPayable). */
	delegate(to: string) : Promise<void>{
			return new Promise<void>((resolve, reject) => {
			try {
				console.log("Sending transaction Ballot.delegate"); 
				const callback = async (error, txId) => { console.log("Transaction submitted for Ballot.delegate"); if (error) {reject(error);} resolve(await this.getTransactionReceiptMined(txId, 500)); };  
				const contract : any = this.web3.eth.contract(this.abi).at(this.address);
				const gas = contract.delegate.estimateGas(to, { from: this.web3.eth.defaultAccount }); 
				console.log("Gas estimate for 'delegate': " + gas); 
				const trn = { gas: gas, from: this.web3.eth.defaultAccount };
				return this.innerProxy.delegate.sendTransaction(to, trn, callback);  
			}
			catch (err) {
				console.error("Ballot.delegate: " + err);
				reject(err);
			}
		});
	}  	
	/** giveRightToVote (NonPayable). */
	giveRightToVote(voter: string) : Promise<void>{
			return new Promise<void>((resolve, reject) => {
			try {
				console.log("Sending transaction Ballot.giveRightToVote"); 
				const callback = async (error, txId) => { console.log("Transaction submitted for Ballot.giveRightToVote"); if (error) {reject(error);} resolve(await this.getTransactionReceiptMined(txId, 500)); };  
				const gas = 42668;  
				const trn = { gas: gas, from: this.web3.eth.defaultAccount };
				return this.innerProxy.giveRightToVote.sendTransaction(voter, trn, callback);  
			}
			catch (err) {
				console.error("Ballot.giveRightToVote: " + err);
				reject(err);
			}
		});
	}  
}

 
interface IBallotProposalsResponse{
	 
	name: string;  
	voteCount: number;   
}
 
interface IBallotVotersResponse{
	 
	weight: number;  
	voted: boolean;  
	delegate: string;  
	vote: number;   
}
 

export{ BallotRepository, Ballot, IBallotProposalsResponse, IBallotVotersResponse }
