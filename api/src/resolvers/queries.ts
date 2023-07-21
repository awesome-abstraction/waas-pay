import { QueryResolvers } from "../__generated__/types";

const queries: QueryResolvers = {
  // @ts-ignore
  testings: async (_, __, { dataSources }) => {
    console.log("?", await dataSources.db.getTestings());
    return dataSources.db.getTestings();
  },
};

export default queries;
