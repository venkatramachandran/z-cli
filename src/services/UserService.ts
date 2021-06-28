import { inject, singleton } from 'tsyringe';
import { Logger } from 'winston';
import User from '../models/User';
import QueryParam from '../types/Query';
import BaseService from './BaseService';

@singleton()
export default class UserService extends BaseService<User> {
  constructor(@inject('users') data: User[], @inject('logger') logger: Logger) {
    super(data, logger);
    logger.info(`got data with ${data.length} rows`);
  }

  public search(q: QueryParam<User>): User[] {
    return this.data.filter((o: User) => {
      if (Array.isArray(o[q.key])) {
        return (o[q.key] as Array<string>).includes(q.value as string);
      }
      return o[q.key] == q.value; // eslint-disable-line eqeqeq
    });
  }
}
