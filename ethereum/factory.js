import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xb374F6183E32E7b8D414C1460eFBBb1Fa92210DB"
);

export default instance;
