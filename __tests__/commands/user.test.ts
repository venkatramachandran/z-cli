import 'reflect-metadata';
import '../__fixtures__/di';
import yargs from 'yargs';
import cmd from '../../src/commands/command';
import { container } from 'tsyringe';
import UserHandler from '../../src/handlers/UserHandler';
import CliInput from '../../src/models/CliInput';
import { UserFields } from '../../src/models/User';

describe('User Command', () => {
  let user: any;
  beforeEach(() => {
    console.log = jest.fn().mockImplementation(() => {});
    user = cmd({
      command: 'user <operation>', description: 'User Search Command', choices: UserFields, handler: (args: CliInput) => {
        container.resolve(UserHandler).handler(args);
      }
    });
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
