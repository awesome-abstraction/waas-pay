import { json } from "@helia/json";
import { CID } from "multiformats/cid";
import type { QueryResolvers, UserWalletsMeta } from "../__generated__/types";

const queries: QueryResolvers = {
  ping: () => "pong",
  getUserWalletsMeta: async (_parent, { cid: cidInput }, { ipfsNode }) => {
    try {
      const jsonNode = json(ipfsNode);
      const cid = CID.parse(cidInput);
      const data = await jsonNode.get<UserWalletsMeta>(cid);
      return { status: 200, data };
    } catch (e) {
      console.log("Error Getting Metadata!!!", e);
      return { status: 500 };
    }
  },
};

export default queries;
