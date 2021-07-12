import { Argv } from 'yargs';
import CliInput from '../models/CliInput';

const cmd = ({command = '', description = '', choices = [], handler = () => {}}: {command: string, description: string, choices: string[], handler: (args: CliInput) => void }) => ({
  command,
  description,
  builder: (yargs: Argv) => yargs
    .options({
      field: {
        alias: 'f',
        required: true,
        description: 'The field to search on',
        choices,
      },
      value: {
        alias: 'v',
        type: 'string',
        description: 'The value to match against. To match on a blank value, do not provide the flag',
      },
    })
    .positional('operation', {
      describe: 'perform operation on an organization',
      choices: ['search'],
      required: true,
    }),
  handler,
});

export default cmd;
