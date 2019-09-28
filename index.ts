//This project was based on the work of Xavier Decuyper https://www.codementor.io/savjee
//This project "CD Blockchain" was forked on 9/16/19 
//Some important improvements include automated timestamp generation, update to TypeScript, and the ability for..
//..difficulty of the mine to increase over time (in development).
//CD Blockchain is licensed under the MIT License
//Copyright (c) <2019> <Cameron Day>
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.
const SHA256 = require("./node_modules/crypto-js/sha256")
class Block {
	public previousHash: any;
	public timestamp: any;
	public information: any;
	public hash: any;
	public nonce: any;

    constructor(previousHash = '') {
        this.previousHash = previousHash
        this.timestamp = new Date()
        var information = 1
        this.information = information
        this.hash = this.calculateHash()
        this.nonce = 0
    }
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.information++) + this.nonce).toString()
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
          this.nonce++
          this.hash = this.calculateHash()
        }
        console.log("BLOCK MINED: " + this.hash)
    }
}
class Blockchain {
	public chain: any;
	public difficulty: any;
	public createGenesisBlock: any;

    constructor() {
        this.chain = [this.generateGenesisBlock()]
        this.difficulty = 6
    }
    generateGenesisBlock() {
        return new Block("","Genesis", "0" )
    }
    fetchBlocks() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.fetchBlocks().hash
        newBlock.mineBlock(this.difficulty) //Mines the block
        this.chain.push(newBlock)
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
        }
        if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
        }
        if (currentBlock.previousHash !== previousBlock.hash) {
        	return false;
        }
        if(this.chain[0] !== this.createGenesisBlock()){
            return false;
        }
        return true; //if chain is valid proceed.
    }
}
const startCoin  = new Blockchain();
while (true) {
    console.log('Mining block...');
    startCoin.addBlock(new Block("", "New Block", {}))
}
