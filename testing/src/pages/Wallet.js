import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useGetIpfs } from "../hooks/useIpfs";

const CID = "CID(QmdVKs9edTDqs78DCLAAaQdXD5Y5MHqbugtsxcDnw1SALA)";

const PING_QUERY = gql`
  query Ping {
    ping
  }
`;

const IPFS_MUTATION = gql`
  mutation safeToIpfsNode($input: SaveToIpfsInput!) {
    safeToIpfsNode(input: $input) {
      status
      userCids {
        cid
      }
    }
  }
`;

const testWalletMetaData = {
  walletType: "SAFE",
  features: [
    {
      id: "Feat1",
      serializedParams: '{"param1":"value1","param3":"value2"}',
    },
  ],
  users: [{ phoneOrEmail: "luisfs@comcast.net" }],
};

const Wallet = () => {
  const { uuid } = useParams();
  const [mutate, { data, loading, error }] = useMutation(IPFS_MUTATION, {
    variables: { input: testWalletMetaData },
  });

  const {
    data: qData,
    loading: qLoading,
    error: qError,
  } = useQuery(PING_QUERY);

  if (qLoading) {
    return <div>qLoading</div>;
  }

  return (
    <div>
      <h1>Wallet</h1>
      <p>{uuid}</p>
      <p>Data: {JSON.stringify(data)}</p>
      <p>QData: {JSON.stringify(qData)}</p>
      <button
        onClick={() => {
          mutate();
        }}
      >
        Click
      </button>
    </div>
  );
};

export default Wallet;
