require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const RINKEBY_PROJECT_ID = "";
const RINKEBY_PRIVATE_KEY = "";

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: `https://rinkeby.infura.io/v3/${RINKEBY_PROJECT_ID}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    },
  },
};
