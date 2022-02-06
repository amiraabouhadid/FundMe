import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x8b1209cD6a2B7fA350641a8B90110B61173A52F3"
);

export default instance;
