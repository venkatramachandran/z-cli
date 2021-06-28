import { container } from 'tsyringe';
import { Argv } from 'yargs';
import UserHandler from '../handlers/UserHandler';
import CliInput from '../models/CliInput';
import { UserFields } from '../models/User';

const cmd = {
  command: 'user <operation>',
  description: 'User Search Command',
  builder: (yargs: Argv) => yargs
    .options({
      field: {
        alias: 'f',
        required: true,
        description: 'The field to search on',
        choices: UserFields,
      },
      value: {
        alias: 'v',
        type: 'string',
        description: 'The value to match against. To match on a blank value, do not provide the flag',
      },
    })
    .positional('operation', {
      describe: 'perform operation on an user',
      choices: ['search'],
      required: true,
    }),
  handler: (args: CliInput) => {
    container.resolve(UserHandler).handler(args);
  },
};

export default cmd;
