import 'reflect-metadata';
import winston, { Logger } from 'winston';
import Ticket from '../../src/models/Ticket';
import data from '../__fixtures__/tickets';
import TicketService from '../../src/services/TicketService';
import QueryParam from '../../src/types/Query';

describe('Ticket Service', () => {
  let os: TicketService;

  const logger: Logger = winston.createLogger({ transports: [new winston.transports.Console({ silent: true })] });
  beforeEach(() => {
    os = new TicketService(data, logger);
  });
  it('should match on provided key and value pair', () => {
    const input: QueryParam<Ticket> = {
      key: 'organization_id',
      value: '200',
    };
    const results = os.search(input);
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      _id: '3',
      external_id: '2a',
    });
  });
  it('should match on provided key and empty value', () => {
    const input: QueryParam<Ticket> = {
      key: 'assignee_id',
      value: undefined
    };
    const results = os.search(input);
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      _id: '4',
      external_id: '4a',
    });
  });
  it('should match on provided key and value pair for multiple rows', () => {
    const input: QueryParam<Ticket> = {
      key: 'external_id',
      value: '2a',
    };
    const results = os.search(input);
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({
      _id: '2',
      external_id: '2a',
    });
    expect(results[1]).toMatchObject({
      _id: '3',
      external_id: '2a',
    });
  });
  it('should match on provided key for empty values', () => {
    const input: QueryParam<Ticket> = {
      key: 'description',
      value: undefined,
    };
    const results = os.search(input);
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({
      _id: '2',
      external_id: '2a',
    });
    expect(results[1]).toMatchObject({
      _id: '4',
      external_id: '4a',
    });
  });
  it('should match any value if the key has an array of values', () => {
    const input: QueryParam<Ticket> = {
      key: 'tags',
      value: 'tag2',
    };
    const results = os.search(input);
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      _id: '2',
      external_id: '2a',
    });
  });
});
