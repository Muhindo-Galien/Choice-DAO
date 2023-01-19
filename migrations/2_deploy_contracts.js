const ChoiceDAO = artifacts.require('ChoiceDAO')

module.exports = async function (deployer) {
  await deployer.deploy(ChoiceDAO)
}
