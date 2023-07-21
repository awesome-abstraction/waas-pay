import type { WalletFeature } from "./__generated__/types";

export type DeserializedFeature = Omit<WalletFeature, "serializedParams"> & {
  params: Record<string, any>;
};
