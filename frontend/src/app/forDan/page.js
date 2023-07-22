"use client";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { WithApolloClient } from "../../lib/apollo";

const SAVE_META_DATA_MUTATION = gql`
  mutation SaveUserWalletsMeta($input: SaveUserWalletsMetaInput!) {
    saveUserWalletsMeta(input: $input) {
      status
      cid
    }
  }
`;

const GET_META_DATA_QUERY = gql`
  query GetUsersWalletsMeta($cid: String!) {
    getUserWalletsMeta(cid: $cid) {
      data {
        companyName
        minaSmartContractAddress
        walletType
      }
    }
  }
`;

const Page = () => {
  return (
    <WithApolloClient>
      <ForDan />
    </WithApolloClient>
  );
};

const ForDan = () => {
  const [inputValue, setInputValue] = useState("random company");
  const [cid, setCid] = useState("");

  const { data, loading, error } = useQuery(GET_META_DATA_QUERY, {
    variables: { cid },
    skip: !cid,
  });

  const [saveMetaData, { loading: saveLoading, error: saveError }] =
    useMutation(SAVE_META_DATA_MUTATION);

  const exampleInput = {
    walletType: "SAFE",
    companyName: inputValue,
    minaSmartContractAddress: "0x",
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "3rem" }}>
      <p>{data ? `SAVED DATA: ${JSON.stringify(data)}` : `DATA NOT SAVED`}</p>
      <button
        disabled={saveLoading}
        onClick={async () => {
          const result = await saveMetaData({
            variables: { input: exampleInput },
          });
          console.log("data from save", result.data.saveUserWalletsMeta);
          setCid(result.data.saveUserWalletsMeta.cid);
        }}
      >
        {saveLoading ? "Loading..." : "Click to save the input data below"}
      </button>
      <pre>{JSON.stringify(exampleInput, null, 2)}</pre>
      <div>
        <p style={{ fontSize: "0.6rem" }}>Custom Company Name</p>
        <input
          placeholder="Enter company name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value || "")}
        />
      </div>
    </div>
  );
};

export default Page;
