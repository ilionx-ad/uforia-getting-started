import { ITransactionObject, OnCompletedCallback, IContractDeploymentReceipt, IError } from "./Uforeum";


/** Voting Ethereum smart contract repository. */
class VotingRepository {
	private abi: any = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"voterDetails","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"votesInTokens","type":"uint256"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allCandidates","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"transferTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voterInfo","outputs":[{"name":"voterAddress","type":"address"},{"name":"tokensBought","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"indexOfCandidate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"tokens","type":"uint256"},{"name":"pricePerToken","type":"uint256"},{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
	private bin: string = '0x6060604052341561000f57600080fd5b604051610cdd380380610cdd833981016040528080519060200190919080519060200190919080518201919050508060029080519060200190610053929190610071565b508260038190555082600481905550816005819055505050506100e9565b8280548282559060005260206000209081019282156100b3579160200282015b828111156100b2578251829060001916905591602001919060010190610091565b5b5090506100c091906100c4565b5090565b6100e691905b808211156100e25760008160009055506001016100ca565b5090565b90565b610be5806100f86000396000f3006060604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632f265cf7146100d5578063518ab2a8146101105780635938750d146101395780636b2dc6b5146101ce5780637021939f146101fe5780637e1c0c09146102395780637ff9b5961461026257806381c407151461028b578063a03fa7e3146102f5578063a6f2ae3a1461032e578063b13c744b1461034c578063cdf58d351461038b578063e4494a0f1461040b578063ecd098b014610434575b600080fd5b34156100e057600080fd5b6100fa60048080356000191690602001909190505061046f565b6040518082815260200191505060405180910390f35b341561011b57600080fd5b610123610494565b6040518082815260200191505060405180910390f35b341561014457600080fd5b610170600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104a2565b6040518083815260200180602001828103825283818151815260200191508051906020019060200280838360005b838110156101b957808201518184015260208101905061019e565b50505050905001935050505060405180910390f35b34156101d957600080fd5b6101fc60048080356000191690602001909190803590602001909190505061058a565b005b341561020957600080fd5b610223600480803560001916906020019091905050610821565b6040518082815260200191505060405180910390f35b341561024457600080fd5b61024c610839565b6040518082815260200191505060405180910390f35b341561026d57600080fd5b61027561083f565b6040518082815260200191505060405180910390f35b341561029657600080fd5b61029e610845565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156102e15780820151818401526020810190506102c6565b505050509050019250505060405180910390f35b341561030057600080fd5b61032c600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a7565b005b610336610901565b6040518082815260200191505060405180910390f35b341561035757600080fd5b61036d6004808035906020019091905050610a0b565b60405180826000191660001916815260200191505060405180910390f35b341561039657600080fd5b6103c2600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a2f565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b341561041657600080fd5b61041e610a73565b6040518082815260200191505060405180910390f35b341561043f57600080fd5b610459600480803560001916906020019091905050610a79565b6040518082815260200191505060405180910390f35b6000600160008360001916600019168152602001908152602001600020549050919050565b600060045460035403905090565b60006104ac610b40565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002018080548060200260200160405190810160405280929190818152602001828054801561057a57602002820191906000526020600020905b815481526020019060010190808311610566575b5050505050905091509150915091565b600080600061059885610a79565b92507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83141515156105c957600080fd5b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020180549050141561069e57600091505b60028054905082101561069d576000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201805480600101828161067b9190610b54565b916000526020600020900160008090919091505550818060010192505061061b565b5b6107366000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020180548060200260200160405190810160405280929190818152602001828054801561072c57602002820191906000526020600020905b815481526020019060010190808311610718575b5050505050610af7565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015403905083811015151561078a57600080fd5b8360016000876000191660001916815260200190815260200160002060008282540192505081905550836000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002018481548110151561080257fe5b9060005260206000209001600082825401925050819055505050505050565b60016020528060005260406000206000915090505481565b60035481565b60055481565b61084d610b80565b600280548060200260200160405190810160405280929190818152602001828054801561089d57602002820191906000526020600020905b81546000191681526020019060010190808311610885575b5050505050905090565b8073ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f1935050505015156108fe57600080fd5b50565b6000806005543481151561091157fe5b049050600454811115151561092557600080fd5b336000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008282540192505081905550806004600082825403925050819055508091505090565b600281815481101515610a1a57fe5b90600052602060002090016000915090505481565b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b60045481565b600080600090505b600280549050811015610acd578260001916600282815481101515610aa257fe5b906000526020600020900154600019161415610ac057809150610af1565b8080600101915050610a81565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff91505b50919050565b6000806000809150600090505b8351811015610b36578381815181101515610b1b57fe5b90602001906020020151820191508080600101915050610b04565b8192505050919050565b602060405190810160405280600081525090565b815481835581811511610b7b57818360005260206000209182019101610b7a9190610b94565b5b505050565b602060405190810160405280600081525090565b610bb691905b80821115610bb2576000816000905550600101610b9a565b5090565b905600a165627a7a72305820f42f070cf4071cb5224737f5d4428c154c7b9998191c50776d17de04c7c569880029';

	constructor(private web3: any){
		if(web3 === undefined){
			throw "Undefined web3 parameter in VotingRepository contructor";
		}
	}

	private tryAtMost(tries, executor) {
		--tries;
		return new Promise(executor)
			.catch(err => tries > 0 ?
				this.tryAtMost(tries, executor)
				: Promise.reject(err));
	}

	getDeployed(address:string) : Voting {
		const contract : any = this.web3.eth.contract(this.abi);
		return new Voting(contract.at(address), this.web3, this.abi, this.bin);
	}
	
	async deploy(tokens: number, pricePerToken: number, candidateNames: string[], ) : Promise<IContractDeploymentReceipt<Voting>>  {	
		let contract : any = this.web3.eth.contract(this.abi);
		 
		var ctorData = contract.new.getData(tokens, pricePerToken, candidateNames, {data: this.bin });
		var estimate = this.web3.eth.estimateGas({data: ctorData});
		const response = contract.new(tokens, pricePerToken, candidateNames, {
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
					return new Voting(contract.at(receipt.contractAddress), this.web3, this.abi, this.bin);					
				}
				return undefined;
			}
		};	
	}
}


 

class Voting{
	public address: string;

	constructor(private innerProxy: any, private web3: any, private abi: any, private bin: string){
		this.address = innerProxy.address;
	}

	
	 	
	/** totalVotesFor (View). */
	totalVotesFor(candidate: string) : number{  
		var result = this.innerProxy.totalVotesFor.call(candidate); 
		return result; 
	}

	/** totalVotesFor (View). */
	totalVotesForAsync(candidate: string) : Promise<number>{
		return new Promise<number>((resolve, reject) => {
			try {
				this.innerProxy.totalVotesFor.call(candidate, (error, result) => {
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
	/** tokensSold (View). */
	tokensSold() : number{  
		var result = this.innerProxy.tokensSold.call(); 
		return result; 
	}

	/** tokensSold (View). */
	tokensSoldAsync() : Promise<number>{
		return new Promise<number>((resolve, reject) => {
			try {
				this.innerProxy.tokensSold.call((error, result) => {
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
	/** voterDetails (View). */
	voterDetails(user: string) : IVotingVoterDetailsResponse{  
		let response = this.innerProxy.voterDetails.call(user);
		return {item1: response[0], item2: response[1]};  
	}

	/** voterDetails (View). */
	voterDetailsAsync(user: string) : Promise<IVotingVoterDetailsResponse>{
		return new Promise<IVotingVoterDetailsResponse>((resolve, reject) => {
			try {
				this.innerProxy.voterDetails.call(user, (error, result) => {
					if (error)
						reject(error); 
					resolve({item1: result[0], item2: result[1]});
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}  	
	/** votesReceived (View). */
	votesReceived(i: string) : number{  
		var result = this.innerProxy.votesReceived.call(i); 
		return result; 
	}

	/** votesReceived (View). */
	votesReceivedAsync(i: string) : Promise<number>{
		return new Promise<number>((resolve, reject) => {
			try {
				this.innerProxy.votesReceived.call(i, (error, result) => {
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
	/** totalTokens (View). */
	totalTokens() : number{  
		var result = this.innerProxy.totalTokens.call(); 
		return result; 
	}

	/** totalTokens (View). */
	totalTokensAsync() : Promise<number>{
		return new Promise<number>((resolve, reject) => {
			try {
				this.innerProxy.totalTokens.call((error, result) => {
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
	/** tokenPrice (View). */
	tokenPrice() : number{  
		var result = this.innerProxy.tokenPrice.call(); 
		return result; 
	}

	/** tokenPrice (View). */
	tokenPriceAsync() : Promise<number>{
		return new Promise<number>((resolve, reject) => {
			try {
				this.innerProxy.tokenPrice.call((error, result) => {
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
	/** allCandidates (View). */
	allCandidates() : string[]{  
		var result = this.innerProxy.allCandidates.call(); 
		return result.map(item=> this.web3.toAscii(item).replace(/\u0000/g, '')); 
	}

	/** allCandidates (View). */
	allCandidatesAsync() : Promise<string[]>{
		return new Promise<string[]>((resolve, reject) => {
			try {
				this.innerProxy.allCandidates.call((error, result) => {
					if (error)
						reject(error); 
					resolve(result.map(item=> this.web3.toAscii(item).replace(/\u0000/g, '')));
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}  	
	/** candidateList (View). */
	candidateList(i: number) : string{  
		var result = this.innerProxy.candidateList.call(i); 
		return this.web3.toAscii(result).replace(/\u0000/g, ''); 
	}

	/** candidateList (View). */
	candidateListAsync(i: number) : Promise<string>{
		return new Promise<string>((resolve, reject) => {
			try {
				this.innerProxy.candidateList.call(i, (error, result) => {
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
	/** voterInfo (View). */
	voterInfo(i: string) : IVotingVoterInfoResponse{  
		let response = this.innerProxy.voterInfo.call(i);
		return {voterAddress: response[0], tokensBought: response[1]};  
	}

	/** voterInfo (View). */
	voterInfoAsync(i: string) : Promise<IVotingVoterInfoResponse>{
		return new Promise<IVotingVoterInfoResponse>((resolve, reject) => {
			try {
				this.innerProxy.voterInfo.call(i, (error, result) => {
					if (error)
						reject(error); 
					resolve({voterAddress: result[0], tokensBought: result[1]});
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}  	
	/** balanceTokens (View). */
	balanceTokens() : number{  
		var result = this.innerProxy.balanceTokens.call(); 
		return result; 
	}

	/** balanceTokens (View). */
	balanceTokensAsync() : Promise<number>{
		return new Promise<number>((resolve, reject) => {
			try {
				this.innerProxy.balanceTokens.call((error, result) => {
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
	/** indexOfCandidate (View). */
	indexOfCandidate(candidate: string) : number{  
		var result = this.innerProxy.indexOfCandidate.call(candidate); 
		return result; 
	}

	/** indexOfCandidate (View). */
	indexOfCandidateAsync(candidate: string) : Promise<number>{
		return new Promise<number>((resolve, reject) => {
			try {
				this.innerProxy.indexOfCandidate.call(candidate, (error, result) => {
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

	 	
	/** voteForCandidate (NonPayable). */
	voteForCandidate(candidate: string, votesInTokens: number) : Promise<void>{
			return new Promise<void>((resolve, reject) => {
			try {
				console.log("Sending transaction Voting.voteForCandidate"); 
				const callback = (error, result) => { if (error) {reject(error);} resolve(result); };  
				const contract : any = this.web3.eth.contract(this.abi).at(this.address);
				const gas = contract.voteForCandidate.estimateGas(candidate, votesInTokens, { from: this.web3.eth.defaultAccount }); 
				console.log("Gas estimate for 'voteForCandidate': " + gas); 
				const trn = { gas: gas, from: this.web3.eth.defaultAccount };
				return this.innerProxy.voteForCandidate.sendTransaction(candidate, votesInTokens, trn, callback);  
			}
			catch (err) {
				console.error("Voting.voteForCandidate: " + err);
				reject(err);
			}
		});
	}  	
	/** transferTo (NonPayable). */
	transferTo(account: string) : Promise<void>{
			return new Promise<void>((resolve, reject) => {
			try {
				console.log("Sending transaction Voting.transferTo"); 
				const callback = (error, result) => { if (error) {reject(error);} resolve(result); };  
				const contract : any = this.web3.eth.contract(this.abi).at(this.address);
				const gas = contract.transferTo.estimateGas(account, { from: this.web3.eth.defaultAccount }); 
				console.log("Gas estimate for 'transferTo': " + gas); 
				const trn = { gas: gas, from: this.web3.eth.defaultAccount };
				return this.innerProxy.transferTo.sendTransaction(account, trn, callback);  
			}
			catch (err) {
				console.error("Voting.transferTo: " + err);
				reject(err);
			}
		});
	}  	
	/** buy (Payable). */
	buy(value: number) : Promise<number>{
			return new Promise<number>((resolve, reject) => {
			try {
				console.log("Sending transaction Voting.buy"); 
				if(value <= 0)throw "buy: value <= 0"; 
				const callback = (error, result) => { if (error) {reject(error);} resolve(result); };  
				const gas = 123540;  
				const trn = { gas: gas, from: this.web3.eth.defaultAccount, value: value };
				return this.innerProxy.buy.sendTransaction(trn, callback);  
			}
			catch (err) {
				console.error("Voting.buy: " + err);
				reject(err);
			}
		});
	}  
}

 
interface IVotingVoterDetailsResponse{
	 
	item1: number;  
	item2: number[];   
}
 
interface IVotingVoterInfoResponse{
	 
	voterAddress: string;  
	tokensBought: number;   
}
 

export{ VotingRepository, Voting, IVotingVoterDetailsResponse, IVotingVoterInfoResponse }
