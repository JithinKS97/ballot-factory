require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const INFURA_PROJECT_ID = "";
const INFURA_PRIVATE_KEY = "";

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`${INFURA_PRIVATE_KEY}`],
    },
  },
};
