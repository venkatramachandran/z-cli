import { inject, singleton } from 'tsyringe';
import { Logger } from 'winston';
import Ticket from '../models/Ticket';
import QueryParam from '../types/Query';
import BaseService from './BaseService';

@singleton()
export default class TicketService extends BaseService<Ticket> {
  constructor(@inject('tickets') data: Ticket[], @inject('logger') logger: Logger) {
    super(data, logger);
    logger.info(`got data with ${data.length} rows`);
  }

  public search(q: QueryParam<Ticket>): Ticket[] {
    return this.data.filter((o: Ticket) => {
      if (Array.isArray(o[q.key])) {
        return (o[q.key] as Array<string>).includes(q.value as string);
      }
      return o[q.key] == q.value; // eslint-disable-line eqeqeq
    });
  }
}
