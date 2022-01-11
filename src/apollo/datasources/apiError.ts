import { ApolloError } from 'apollo-server-errors';

export class ApiError extends ApolloError {
  constructor(message: string) {
    super(message);
  }
}
