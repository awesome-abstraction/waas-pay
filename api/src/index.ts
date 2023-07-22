import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FsBlockstore } from "blockstore-fs";
import { readFileSync } from "fs";
import { createHelia } from "helia";
import resolvers from "./resolvers";

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

const fsBlocktore = new FsBlockstore("./var");
const typeDefs = readFileSync("./schema.gql", { encoding: "utf-8" });

export type ServerContext = {
  ipfsNode: AsyncReturnType<typeof createHelia>;
};

const start = async () => {
  const server = new ApolloServer<ServerContext>({
    typeDefs,
    resolvers,
  });

  const ipfsNode = (await createHelia({
    blockstore: fsBlocktore,
  })) as AsyncReturnType<typeof createHelia>;

  const { url } = await startStandaloneServer(server, {
    context: async () => ({ ipfsNode }),
  });

  console.log(`🚀 Server listening at: ${url}`);
};

void start().catch((e) => {
  console.log("Errr", e);
  process.exit(1);
});
