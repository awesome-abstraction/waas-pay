import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FsBlockstore } from "blockstore-fs";
import { readFileSync } from "fs";
import { createHelia } from "helia";
import type { AsyncReturnType } from "types";
import resolvers from "./resolvers";

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

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const ipfsNode = (await createHelia({
        blockstore: fsBlocktore,
      })) as AsyncReturnType<typeof createHelia>;
      return { ipfsNode };
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
};

void start().catch((e) => {
  console.log("Errr", e);
  process.exit(1);
});