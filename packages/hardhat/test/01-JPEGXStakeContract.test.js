const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const strikeprice = ethers.utils.parseEther("1")
describe("JPEGXStakeContract Test", () => {
    let player1
    let player2
    let Staking
    let ERC721token
    let JPEGXStakeContract

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        accounts = await ethers.getSigners()
        player1 = accounts[1]
        player2 = accounts[2]
        await deployments.fixture(["all"])
        ERC721token = await ethers.getContract("ERC721TOKEN")
        JPEGXStakeContract = await ethers.getContract("JPEGXStakeContract")
    })

    it("mint the ERC 721 Token", async () => {
        await ERC721token.publicMint(2)
        let number = await ERC721token.balanceOf(deployer)
        assert.equal(number.toString(), 2)
    })

    it("function stakerIn store strikeprice, tokenId, stakedamount, stakedowner correctly", async () => {
        let tokenId = 1 
        await ERC721token.connect(player1).publicMint(2)
        await ERC721token.connect(player1).setApprovalForAll(JPEGXStakeContract.address, true)
        await JPEGXStakeContract.connect(player1).stakerIn(strikeprice,tokenId)
        let result = await JPEGXStakeContract.tokenId_owner(tokenId)
        assert.equal(result.toString(), player1.address)
        
        // assert.equal(, 1)
    })

    it("function stakerIn stakes the nft in the contract safely", async () => {
        let tokenId = 1 
        await ERC721token.connect(player1).publicMint(2)
        await ERC721token.connect(player1).setApprovalForAll(JPEGXStakeContract.address, true)
        await JPEGXStakeContract.connect(player1).stakerIn(strikeprice,tokenId)
        let result = await ERC721token.ownerOf(tokenId)
        assert.equal(result.toString(), JPEGXStakeContract.address)

    })

    it("function stakerIn emit the event", async () => {
        let tokenId = 1 
        await ERC721token.connect(player1).publicMint(2)
        await ERC721token.connect(player1).setApprovalForAll(JPEGXStakeContract.address, true)
        await expect(JPEGXStakeContract.connect(player1).stakerIn(strikeprice,tokenId)).to.emit(JPEGXStakeContract, "Staked")

    })

})
