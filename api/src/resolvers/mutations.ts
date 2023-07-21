import type { MutationResolvers, WalletFeature } from "../__generated__/types";

export type DeserializedFeature = Omit<WalletFeature, "serializedParams"> & {
  params: Record<string, any>;
};

const mutations: MutationResolvers = {
  createWalletFromMetadata: async (_parent, { walletType, features }) => {
    try {
      const deserializedFeatures: DeserializedFeature[] = features.map(
        ({ serializedParams, ...rest }) => ({
          ...rest,
          params: JSON.parse(serializedParams),
        })
      );
      return { status: 200 };
    } catch {
      return { status: 400 };
    }
  },
};

export default mutations;
