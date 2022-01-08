import { DataSource } from 'apollo-datasource';
import { ApolloServer } from 'apollo-server-express';
import PostAPI from './datasources/post';
import schema from './schema';
import { Response, Request } from 'express';
import UserAPI from 'apollo/datasources/user';
import CategoryAPI from 'apollo/datasources/category';
import NoticeAPI from 'apollo/datasources/notice';

const dataSources: {
  userAPI: DataSource,
  postAPI: DataSource,
  categoryAPI: DataSource,
  noticeAPI: DataSource
} = {
  userAPI: new UserAPI(),
  postAPI: new PostAPI(),
  categoryAPI: new CategoryAPI(),
  noticeAPI: new NoticeAPI(),
};

const context = async ({ req, res }: { req: Request, res: Response }) => {
  return {
    accessToken: res.locals.token,
    syncToken: res.locals.sync,
  };
};

const createApolloServer = (): ApolloServer => {
  return new ApolloServer({
    schema,
    context,
    dataSources: () => dataSources,
  });
};

export default createApolloServer;
