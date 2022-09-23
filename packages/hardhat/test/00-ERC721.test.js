const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("ERC721NFT Test", function () {
    it("Should return the correct symbol", async function () {
        const BasicNFT = await ethers.getContractFactory("ERC721TOKEN")
        const basicNFT = await BasicNFT.deploy()
        await basicNFT.deployed()

        expect(await basicNFT.symbol()).to.equal("ERC721")
    })

    it("Should return the correct name", async function () {
        const BasicNFT = await ethers.getContractFactory("ERC721TOKEN")
        const basicNFT = await BasicNFT.deploy()
        await basicNFT.deployed()

        expect(await basicNFT.name()).to.equal("ERC721")
    })
})
