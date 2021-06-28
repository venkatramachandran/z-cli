import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import org from './commands/org';
import ticket from './commands/ticket';
import user from './commands/user';

import './services/di';

export default () => {
  const { argv } = yargs(hideBin(process.argv)) // eslint-disable-line @typescript-eslint/no-unused-vars
    .command(org)
    .command(ticket)
    .command(user)
    .demandCommand(1);
};
