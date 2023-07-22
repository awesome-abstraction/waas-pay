/// import * as IPFS from "ipfs-core";
"use client";
import { useCallback, useState, useEffect } from "react";
import { createHelia } from "helia";
import { strings } from "@helia/strings";

export const useGetIpfs = ({ cid }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    (async () => {
      try {
        const helia = await createHelia();
        const j = strings(helia);
        const results = await j.get(cid);
        //   const results = await ipfsClient.get(cid);
        console.log("results", results);
        setData(results);
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
