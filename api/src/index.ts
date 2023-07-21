import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { DataSource } from "./datasource";
import resolvers from "./resolvers";

const typeDefs = readFileSync("./schema.gql", { encoding: "utf-8" });

export type ServerContext = {
  dataSources: {
    db: DataSource;
  };
};

const start = async () => {
  const server = new ApolloServer<ServerContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return { dataSources: { db: new DataSource() } };
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
};

void start().catch((e) => {
  console.log("Errr", e);
  process.exit(1);
});
