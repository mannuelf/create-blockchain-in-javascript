const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
    }

    calculateHash() {
        return SHA256( this.index + this.timestamp + JSON.stringify(this.data) ).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '28/12/2017','Genesis Block', '0');
    }

    getLatestBlock() {
        // returns the latest block in the chain
        return this.chain[this.chain.length - 1];
    }

    // adding new block onto the chain
    addBlock(newBlock) {
        // set the previouse hash property
        newBlock.previousHash = this.getLatestBlock().hash;
        //recalculate its hash
        newBlock.hash = newBlock.calculateHash();
        // push it onto the chain
        this.chain.push(newBlock);
    }

    // validate the integrity of block
    isChainValid() {
        // loop over the whole chain
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            return true;
        }
    }
}

// create an instance of the Blockchain
let mannyCoin = new Blockchain();
mannyCoin.addBlock(new Block(1, '28/12/2017', { amount: 5 }));
mannyCoin.addBlock(new Block(2, '29/12/2017', { amount: 20 }));

console.log('Is blockChain valid?', + mannyCoin.isChainValid());

// overide the first block in the chain, by change data
mannyCoin.chain[1].data = { amount: 200 };

// recalculate the hash
mannyCoin.chain[1].data = mannyCoin.chain[1].calculateHash();

console.log('Is blockChain valid?', + mannyCoin.isChainValid());

// console.log(JSON.stringify(mannyCoin, null, 4));