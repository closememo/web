import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

// types
import postType from './post/post.t.graphql';
import userType from './user/user.t.graphql';
import categoryType from './category/category.t.graphql';
import noticeType from './notice/notice.t.graphql';
// resolvers
import postResolver from './post/post.resolver';
import userResolver from './user/user.resolver';
import categoryResolver from './category/category.resolver';
import noticeResolver from './notice/notice.resolver';

const typeDefs = mergeTypeDefs([postType, userType, categoryType, noticeType]);
const resolvers = mergeResolvers([postResolver, userResolver, categoryResolver, noticeResolver]);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
