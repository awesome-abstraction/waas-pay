import { json } from "@helia/json";
import type { MutationResolvers, WalletFeature } from "../__generated__/types";

export type DeserializedFeature = Omit<WalletFeature, "serializedParams"> & {
  params: Record<string, any> | null;
};

const mutations: MutationResolvers = {
  createWalletFromMetadata: async (_parent, { walletType, features }) => {
    try {
      const deserializedFeatures: DeserializedFeature[] = features.map(
        ({ serializedParams, ...rest }) => ({
          ...rest,
          params: serializedParams ? JSON.parse(serializedParams) : null,
        })
      );
      return { status: 200 };
    } catch {
      return { status: 400 };
    }
  },
  safeToIpfsNode: async (_parent, { input }, { ipfsNode }) => {
    try {
      console.log("INPUT", input);
      const { features, ...rest } = input;
      const deserializedFeatures: DeserializedFeature[] = features.map(
        ({ serializedParams, ...rest }) => ({
          ...rest,
          params: serializedParams ? JSON.parse(serializedParams) : null,
        })
      );

      const jsonNode = json(ipfsNode);

      // just save as one for now
      const cid = await jsonNode.add({
        features: deserializedFeatures,
        ...rest,
      });

      console.log("CID", cid.toString());

      return {
        status: 200,
        userCids: [{ phoneOrEmail: "", cid: cid.toString() }],
      };
    } catch (e) {
      console.log("ERRR", e);
      return {
        status: 400,
      };
    }
  },
};

export default mutations;
