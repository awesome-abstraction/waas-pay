"use client";

import { gql, useQuery } from "@apollo/client";
import { WithApolloClient } from "../../../apollo";
import { useGetIpfs } from "../../../useIpfs";

const CID = "CID(QmdVKs9edTDqs78DCLAAaQdXD5Y5MHqbugtsxcDnw1SALA)";

const PING_QUERY = gql`
  query Ping {
    ping
  }
`;

export default function Page({ params: { walletUuid } }) {
  const { data, loading, error } = useGetIpfs({ cid: CID });

  if (loading) {
    return loading;
  }
  return (
    <WithApolloClient>
      DATA: {JSON.stringify(data)}
      <Wallet />
    </WithApolloClient>
  );
}

const Wallet = ({ walletUuid }) => {
  const { data, loading, error } = useQuery(PING_QUERY);
  if (loading) return <div>loading</div>;
  return <div>data.ping</div>;
};
