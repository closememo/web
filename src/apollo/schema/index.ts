import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

// types
import postType from './post/post.t.graphql';
import userType from './user/user.t.graphql';
// resolvers
import postResolver from './post/post.resolver';
import userResolver from './user/user.resolver';

const typeDefs = mergeTypeDefs([postType, userType]);
const resolvers = mergeResolvers([postResolver, userResolver]);

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
