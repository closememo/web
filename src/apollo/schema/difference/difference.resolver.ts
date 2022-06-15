import DifferenceAPI from 'apollo/datasources/difference';

interface DataSources {
  differenceAPI: DifferenceAPI;
}

export default {
  Query: {
    differences: async (_: any, { documentId }: { documentId: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.differenceAPI.getDifferences(documentId);
    },
    difference: async (_: any, { differenceId }: { differenceId: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.differenceAPI.getDifference(differenceId);
    },
  },
};
