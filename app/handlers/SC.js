import {web3} from './handlers';
import scContract from './contracts/SC.json';
import {config} from 'dotenv';

config();

export default class SC{
	constructor(){
		this.instance = new web3.eth.Contract(scContract.abi, process.env.contract_address);
	};

	get text() {
		return new Promise((resolve, reject) => {
			this.instance.methods.text()
				.call()
				.then(resolve)
				.catch(reject);
		});
	}
};