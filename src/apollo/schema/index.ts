import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

// types
import postType from './post/post.t.graphql';
import userType from './user/user.t.graphql';
import categoryType from './category/category.t.graphql';
// resolvers
import postResolver from './post/post.resolver';
import userResolver from './user/user.resolver';
import categoryResolver from './category/category.resolver';

const typeDefs = mergeTypeDefs([postType, userType, categoryType]);
const resolvers = mergeResolvers([postResolver, userResolver, categoryResolver]);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
