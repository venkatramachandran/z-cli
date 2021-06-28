import { inject, singleton } from 'tsyringe';
import { Logger } from 'winston';
import Organization from '../models/Organization';
import QueryParam from '../types/Query';
import BaseService from './BaseService';

@singleton()
export default class OrganizationService extends BaseService<Organization> {
  constructor(@inject('organizations') data: Organization[], @inject('logger') logger: Logger) {
    super(data, logger);
    logger.info(`got data with ${data.length} rows`);
  }

  public search(q: QueryParam<Organization>): Organization[] {
    return this.data.filter((o: Organization) => {
      if (Array.isArray(o[q.key])) {
        return (o[q.key] as Array<string>).includes(q.value as string);
      }
      return o[q.key] == q.value; // eslint-disable-line eqeqeq
    });
  }
}
