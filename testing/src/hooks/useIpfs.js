/// import * as IPFS from "ipfs-core";

import { useCallback, useState, useEffect } from "react";
import { createHelia } from "helia";
import { CID } from "multiformats/cid";
import blockstore from "./store";
import { json } from "@helia/json";
import { IDBBlockstore } from "blockstore-idb";

const idb = new IDBBlockstore();

// https://github.com/ipfs-examples/helia-examples/blob/main/examples/helia-101/201-storage.js

const testWalletMetaData = {
  walletType: "SAFE",
  features: [
    {
      id: "Feat1",
      serializedParams: "{'param1': 'value1', 'param2': 'value2'}",
    },
  ],
};

const CID_C = "bagaaiera2mxxxr6lzpno2sddzqrichkyiag2iycktqyhcscx6mzriygbzclq";

export const useGetIpfs = ({ cid }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    (async () => {
      try {
        const heliaNode = await createHelia({ blockstore });
        // const nodeId = heliaNode.libp2p.peerId.toString();
        // const nodeIsOnline = heliaNode.libp2p.isStarted();

        const j = json(heliaNode);

        const cidss = await j.add(testWalletMetaData, blockstore);

        //const cidss = CID.parse(CID_C);
        console.log("cidss", cidss);
        //const j = strings(heliaNode);
        const results = await j.get(cidss, blockstore);
        //  const results = await ipfs.get(cid);
        //   const results = { nodeId, nodeIsOnline, j: heliaNode.libp2p. };

        console.log("results", results);
        setData({ r: results, c: cidss.toString() });
        heliaNode.stop();
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [cid]);

  return { loading, data, error };
};

export const usePostIpfs = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const post = useCallback(async (file) => {
    setError(null);
    setLoading(true);
    try {
      const results = "";

      //const node = await IPFS.create();
      //const results = await node.add(file);
      setData(results);
      return results;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  return [post, { loading, error, data }];
};
