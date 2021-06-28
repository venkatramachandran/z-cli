import 'reflect-metadata';
import winston, { Logger } from 'winston';
import Organization from '../../src/models/Organization';
import OrganizationService from '../../src/services/OrganizationService';
import QueryParam from '../../src/types/Query';
import data from '../__fixtures__/organizations';

describe('Organization Service', () => {
  let os: OrganizationService;

  const logger: Logger = winston.createLogger({ transports: [new winston.transports.Console({ silent: true })] });
  beforeEach(() => {
    os = new OrganizationService(data, logger);
  });
  it('should match on provided key and value pair', () => {
    const input: QueryParam<Organization> = {
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
    const input: QueryParam<Organization> = {
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
  it('should match any value if the key has an array of values', () => {
    const input: QueryParam<Organization> = {
      key: 'domain_names',
      value: 'domain2',
    };
    const results = os.search(input);
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      _id: 2,
      external_id: '2a',
    });
  });
});
