import { DataSource } from 'apollo-datasource';
import { ApolloServer } from 'apollo-server-express';
import PostAPI from './datasources/post';
import schema from './schema';
import { Response, Request } from 'express';
import UserAPI from 'apollo/datasources/user';
import CategoryAPI from 'apollo/datasources/category';
import NoticeAPI from 'apollo/datasources/notice';
import SuggestionAPI from 'apollo/datasources/suggestion';
import BookmarkAPI from 'apollo/datasources/bookmark';
import NotificationAPI from 'apollo/datasources/notification';
import DifferenceAPI from 'apollo/datasources/difference';

const dataSources: {
  userAPI: DataSource,
  postAPI: DataSource,
  categoryAPI: DataSource,
  noticeAPI: DataSource,
  notificationAPI: DataSource,
  suggestionAPI: DataSource,
  bookmarkAPI: DataSource,
  differenceAPI: DataSource,
} = {
  userAPI: new UserAPI(),
  postAPI: new PostAPI(),
  categoryAPI: new CategoryAPI(),
  noticeAPI: new NoticeAPI(),
  notificationAPI: new NotificationAPI(),
  suggestionAPI: new SuggestionAPI(),
  bookmarkAPI: new BookmarkAPI(),
  differenceAPI: new DifferenceAPI(),
};

const context = async ({ req, res }: { req: Request, res: Response }) => {
  return {
    accessToken: res.locals.token,
    userIp: res.locals.userIp,
  };
};

const createApolloServer = (): ApolloServer => {
  return new ApolloServer({
    debug: false,
    schema,
    context,
    dataSources: () => dataSources,
  });
};

export default createApolloServer;
