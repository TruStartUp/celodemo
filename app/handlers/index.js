import Web3 from 'web3';
import {config} from 'dotenv';

config();

const host = process.env.host;

export const development = true;

export const web3 = development ?
  new Web3(new Web3.providers.HttpProvider(`http://${host}:8545`)) :
  new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/0d08a0269fb64ef8a892396738655216'));