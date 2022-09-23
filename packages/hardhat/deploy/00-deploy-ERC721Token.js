const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("-----------------")
  const arguments = []
  const ERC721TOKEN = await deploy("ERC721TOKEN", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("verifying...")
    await verify(ERC721TOKEN.address, arguments)
  }
  log("-----------------")
}
module.exports.tags = ["all", "1", "ERC721"]
