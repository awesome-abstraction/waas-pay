import { json } from "@helia/json";
import type { MutationResolvers } from "../__generated__/types";

const mutations: MutationResolvers = {
  saveUserWalletsMeta: async (_parent, { input }, { ipfsNode }) => {
    try {
      const jsonNode = json(ipfsNode);
      const cid = await jsonNode.add(input);
      console.log("Created CID", cid);
      return {
        status: 200,
        cid: cid.toString(),
      };
    } catch (e) {
      console.log("Error Saving Metadata!!!", e);
      return { status: 500 };
    }
  },
};

export default mutations;
