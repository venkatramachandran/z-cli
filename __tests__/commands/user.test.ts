import 'reflect-metadata';
import '../__fixtures__/di';
import yargs from 'yargs';
import user from '../../src/commands/user';

describe('User Command', () => {
  beforeEach(() => {
    console.log = jest.fn().mockImplementation(() => {});
  });
  afterEach(jest.restoreAllMocks);
  it('parses the command properly', () => {
    const parser = yargs.command(user).help();
    const output = parser.parseSync('user search -f _id -v 1');
    expect(output).toMatchObject({
      _: ['user'],
      field: '_id',
      value: '1',
    });
  });
  it('throws an error if the field name is wrong', () => {
    const parser = yargs.command(user).help();
    parser.parseSync('user search -f _id1 -v 1', {}, (err, argv, output) => {
      expect(err?.message).toMatch('Invalid values');
      expect(output).toMatch('Invalid values');
    });
  });
});
