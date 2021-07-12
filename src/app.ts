import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { container } from 'tsyringe';

import cmd from './commands/command';

import CliInput from './models/CliInput';

import './services/di';

import { OrganizationFields } from './models/Organization';
import OrganizationHandler from './handlers/OrgHandler';
import TicketHandler from './handlers/TicketHandler';
import { TicketFields } from './models/Ticket';
import UserHandler from './handlers/UserHandler';
import { UserFields } from './models/User';

export default () => {
  const { argv } = yargs(hideBin(process.argv)) // eslint-disable-line @typescript-eslint/no-unused-vars
    .command(cmd({
      command: 'organization <operation>', description: 'Organization Search Command', choices: OrganizationFields, handler: (args: CliInput) => {
        container.resolve(OrganizationHandler).handler(args);
      }
    }))
    .command(cmd({
      command: 'ticket <operation>', description: 'Ticket Search Command', choices: TicketFields, handler: (args: CliInput) => {
        container.resolve(TicketHandler).handler(args);
      }
    }))
    .command(cmd({
      command: 'user <operation>', description: 'User Search Command', choices: UserFields, handler: (args: CliInput) => {
        container.resolve(UserHandler).handler(args);
      }
    }))
    .demandCommand(1);
};
