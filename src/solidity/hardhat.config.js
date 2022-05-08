require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const GOERLI_PROJECT_ID = "";
const GOERLI_PRIVATE_KEY = "";

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${GOERLI_PROJECT_ID}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`],
    },
  },
};
