//import ipfs from 'ipfs-api';
const IPFS = require('ipfs-api');
const IPFSComponent = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default IPFSComponent;