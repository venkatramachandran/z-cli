import { container } from 'tsyringe';
import { Argv } from 'yargs';
import TicketHandler from '../handlers/TicketHandler';
import CliInput from '../models/CliInput';
import { TicketFields } from '../models/Ticket';

const cmd = {
  command: 'ticket <operation>',
  description: 'Ticket Search Command',
  builder: (yargs: Argv) => yargs
    .options({
      field: {
        alias: 'f',
        required: true,
        description: 'The field to search on',
        choices: TicketFields,
      },
      value: {
        alias: 'v',
        type: 'string',
        description: 'The value to match against. To match on a blank value, do not provide the flag',
      },
    })
    .positional('operation', {
      describe: 'perform operation on a ticket',
      choices: ['search'],
      required: true,
    }),
  handler: (args: CliInput) => {
    container.resolve(TicketHandler).handler(args);
  },
};

export default cmd;
