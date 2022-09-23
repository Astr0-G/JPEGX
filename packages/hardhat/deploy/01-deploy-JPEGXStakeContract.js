const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const ERC721TOKEN = await ethers.getContract('ERC721TOKEN')

  log("-----------------")
  const arguments = [
    ERC721TOKEN.address,
  ]
  const JPEGXStakeContract = await deploy("JPEGXStakeContract", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("verifying...")
    await verify(JPEGXStakeContract.address, arguments)
  }
  log("-----------------")
}
module.exports.tags = ["all", "2", "JPEGXStakeContract"]
