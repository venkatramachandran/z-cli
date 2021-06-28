import Value from '../types/Value';

export default interface CliInput {
  _: (string | number)[]; // the command
  $0: string; // index file
  field: string;
  value: Value
}
