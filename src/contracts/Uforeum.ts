// <reference path="bignumber.d.ts" />
import * as BigNumber from './bignumber';

interface ITransactionObject {
    // The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified.
    from?: string;
    // The destination address of the message, left undefined for a contract-creation transaction.
    to?: string;
    // Number|String|BigNumber - (optional) The value transferred for the transaction in Wei, also the endowment if it's a contract-creation transaction.
    value?: number | string | BigNumber.BigNumber;
    // Number|String|BigNumber - (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    gas?: number | string | BigNumber.BigNumber;
    // Number|String|BigNumber - (optional, default: To-Be-Determined) The price of gas for this transaction in wei, defaults to the mean network gas price.
    gasPrice?: number | string | BigNumber.BigNumber;
    // Either a byte string containing the associated data of the message, or in the case of a contract-creation transaction, the initialisation code.
    data?: string;
}

interface IError {
    name: string;
    message: string;
    stack?: string;
}

type OnCompletedCallback<T> = (error: IError | undefined, result: T) => void;

interface IContractDeploymentReceipt<T> {
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    contractAddress: string;
    cumulativeGasUsed: number;
    getDeployed: ()=> T | undefined;
}

export { ITransactionObject, OnCompletedCallback, IError, IContractDeploymentReceipt };