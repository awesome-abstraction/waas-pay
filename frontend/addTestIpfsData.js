import * as IPFS from "ipfs-core";

export const run = async () => {
  const node = await IPFS.create();

  const testWalletMetaData = {
    walletType: "SAFE",
    features: [
      {
        id: "Feat1",
        serializedParams: "{'param1': 'value1', 'param2': 'value2'}",
      },
    ],
  };

  const data = JSON.stringify(testWalletMetaData);

  const results = await node.add(data);

  console.log(results);

  process.exit(0);
};

void run();
