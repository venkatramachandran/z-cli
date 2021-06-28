import { Argv } from 'yargs';
import { container } from 'tsyringe';
import CliInput from '../models/CliInput';
import { OrganizationFields } from '../models/Organization';
import OrganizationHandler from '../handlers/OrgHandler';

const cmd = {
  command: 'organization <operation>',
  description: 'Organization Search Command',
  builder: (yargs: Argv) => yargs
    .options({
      field: {
        alias: 'f',
        required: true,
        description: 'The field to search on',
        choices: OrganizationFields,
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
  handler: (args: CliInput) => {
    container.resolve(OrganizationHandler).handler(args);
  },
};

export default cmd;
