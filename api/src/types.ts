import type { WalletFeature } from "./__generated__/types";

export type DeserializedFeature = Omit<WalletFeature, "serializedParams"> & {
  params: Record<string, any>;
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
