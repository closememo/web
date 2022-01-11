import SuggestionAPI from 'apollo/datasources/suggestion';

interface DataSources {
  suggestionAPI: SuggestionAPI
}

export default {
  Query: {
    suggestions: async (_: any, __: any, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.suggestionAPI.getSuggestions();
    },
    suggestion: async (_: any, { suggestionId }: { suggestionId: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.suggestionAPI.getSuggestion({ suggestionId });
    },
  },
  Mutation: {
    createSuggestion: async (_: any, { content }: { content: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.suggestionAPI.createSuggestion({ content });
    },
    updateSuggestion: async (_: any, { suggestionId, content }: { suggestionId: string, content: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.suggestionAPI.updateSuggestion({ suggestionId, content });
    },
    deleteSuggestion: async (_: any, { suggestionId }: { suggestionId: string }, { dataSources }: { dataSources: DataSources }) => {
      return await dataSources.suggestionAPI.deleteSuggestion({ suggestionId });
    },
  },
};
