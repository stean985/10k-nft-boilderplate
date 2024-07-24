const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("NFTModule", (m) => {

  const nft = m.contract("CoreNFT", ["https://corenft.vercel.app/generated_metadata/"]);

  return { nft };
});
