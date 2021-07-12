import 'reflect-metadata';
import '../__fixtures__/di';
import yargs from 'yargs';
import cmd from '../../src/commands/command';
import { container } from 'tsyringe';
import OrganizationHandler from '../../src/handlers/OrgHandler';
import CliInput from '../../src/models/CliInput';
import { OrganizationFields } from '../../src/models/Organization';

describe('User Command', () => {
  let organization: any;
  beforeEach(() => {
    console.log = jest.fn().mockImplementation(() => {});
    organization = cmd({
      command: 'organization <operation>', description: 'Organization Search Command', choices: OrganizationFields, handler: (args: CliInput) => {
        container.resolve(OrganizationHandler).handler(args);
      }
    });
  });
  afterEach(jest.restoreAllMocks);
  it('parses the command properly', () => {
    const parser = yargs.command(organization).help();
    const output = parser.parseSync('organization search -f _id -v 1');
    expect(output).toMatchObject({
      _: ['organization'],
      field: '_id',
      value: '1',
    });
  });
  it('throws an error if the field name is wrong', () => {
    const parser = yargs.command(organization).help();
    parser.parseSync('organization search -f _id1 -v 1', {}, (err, argv, output) => {
      expect(err?.message).toMatch('Invalid values');
      expect(output).toMatch('Invalid values');
    });
  });
});
