const { assert, expect } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Random IPFS Unit Tests", () => {
      let randomIpfs, deployer, vrfCoordinatorV2Mock;

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);

        randomIpfs = await ethers.getContract("RandomIpfsNft", deployer);
        vrfCoordinatorV2Mock = await ethers.getContract(
          "VRFCoordinatorV2Mock",
          deployer
        );
      });

      describe("constructor", function () {
        it("Initializes the RandomIpfs correctly", async function () {
          const tokenCounter = await randomIpfs.getTokenCounter();

          assert.equal(tokenCounter.toString(), "0");
        });
      });

      describe("requestNft", function () {
        it("Fails if amount is not enough to mint", async function () {
          await expect(randomIpfs.requestNft()).to.be.revertedWith(
            "RandomIpfsNft__NeedMoreEthSent"
          );
        });
      });
    });
