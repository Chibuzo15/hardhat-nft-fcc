const { assert, expect } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Basic NFT Unit Tests", () => {
      let BasicNft, deployer;

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);

        BasicNft = await ethers.getContract("BasicNft", deployer);
      });

      describe("constructor", function () {
        it("Initializes the BasicNft correctly", async function () {
          const tokenCounter = await BasicNft.getTokenCounter();

          assert.equal(tokenCounter.toString(), "0");
        });
      });
    });
