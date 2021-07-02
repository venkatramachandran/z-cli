import 'reflect-metadata';
import winston, { Logger } from 'winston';
import User from '../../src/models/User';
import data from '../__fixtures__/users';
import UserService from '../../src/services/UserService';
import QueryParam from '../../src/types/Query';

describe('User Service', () => {
  let os: UserService;

  const logger: Logger = winston.createLogger({ transports: [new winston.transports.Console({ silent: true })] });
  beforeEach(() => {
    os = new UserService(data, logger);
  });
  it('should match on provided key and value pair', () => {
    const input: QueryParam<User> = {
      key: '_id',
      value: '3',
    };
    const results = os.search(input);
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      _id: 3,
      external_id: '2a',
    });
  });
  it('should match on provided key and value pair for multiple rows', () => {
    const input: QueryParam<User> = {
      key: 'external_id',
      value: '2a',
    };
    const results = os.search(input);
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({
      _id: 2,
      external_id: '2a',
    });
    expect(results[1]).toMatchObject({
      _id: 3,
      external_id: '2a',
    });
  });
  it('should match on provided key for empty values', () => {
    const input: QueryParam<User> = {
      key: 'email',
      value: undefined,
    };
    const results = os.search(input);
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({
      _id: 3,
      external_id: '2a',
    });
    expect(results[1]).toMatchObject({
      _id: 4,
      external_id: '4a',
    });
  });
  it('should match any value if the key has an array of values', () => {
    const input: QueryParam<User> = {
      key: 'tags',
      value: 'tag2',
    };
    const results = os.search(input);
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      _id: 2,
      external_id: '2a',
    });
  });
  it('should match on provided key and empty value', () => {
    const input: QueryParam<User> = {
      key: 'timezone',
      value: undefined
    };
    const results = os.search(input);
    expect(results).toHaveLength(4);
  });
});
