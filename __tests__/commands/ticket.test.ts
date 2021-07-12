import 'reflect-metadata';
import '../__fixtures__/di';
import yargs from 'yargs';
import cmd from '../../src/commands/command';
import { container } from 'tsyringe';
import TicketHandler from '../../src/handlers/TicketHandler';
import CliInput from '../../src/models/CliInput';
import { TicketFields } from '../../src/models/Ticket';

describe('Ticket Command', () => {
  let ticket: any;
  beforeEach(() => {
    console.log = jest.fn().mockImplementation(() => {});
    ticket = cmd({
      command: 'ticket <operation>', description: 'Ticket Search Command', choices: TicketFields, handler: (args: CliInput) => {
        container.resolve(TicketHandler).handler(args);
      }
    });
  });
  afterEach(jest.restoreAllMocks);
  it('parses the command properly', () => {
    const parser = yargs.command(ticket).help();
    const output = parser.parseSync('ticket search -f _id -v 1');
    expect(output).toMatchObject({
      _: ['ticket'],
      field: '_id',
      value: '1',
    });
  });
  it('throws an error if the field name is wrong', () => {
    const parser = yargs.command(ticket).help();
    parser.parseSync('ticket search -f _id1 -v 1', {}, (err, argv, output) => {
      expect(err?.message).toMatch('Invalid values');
      expect(output).toMatch('Invalid values');
    });
  });
});
