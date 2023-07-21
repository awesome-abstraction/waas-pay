import { MutationResolvers } from "../__generated__/types";

const mutations: MutationResolvers = {
  addTesting: async (_, { name }, { dataSources }) => {
    return dataSources.db.addTesting({ name });
  },
};

export default mutations;
