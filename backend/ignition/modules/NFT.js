const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("NFTModule", (m) => {

  const nft = m.contract("CoreNFT", ["https://stean985.github.io/10k-gallery-nhts/generated_metadata/"]);

  return { nft };
});
