import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

// types
import postType from './post/post.t.graphql';
import userType from './user/user.t.graphql';
import categoryType from './category/category.t.graphql';
import noticeType from './notice/notice.t.graphql';
import suggestionType from './suggestion/suggestion.t.graphql';
// resolvers
import postResolver from './post/post.resolver';
import userResolver from './user/user.resolver';
import categoryResolver from './category/category.resolver';
import noticeResolver from './notice/notice.resolver';
import suggestionResolver from './suggestion/suggestion.resolver';

const typeDefs = mergeTypeDefs([postType, userType, categoryType, noticeType, suggestionType]);
const resolvers = mergeResolvers([postResolver, userResolver, categoryResolver, noticeResolver, suggestionResolver]);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
