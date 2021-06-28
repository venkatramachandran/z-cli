import { printTable } from 'console-table-printer';

export default class Renderer {
  public render(rows: any[]) { // eslint-disable-line class-methods-use-this
    if (rows && rows.length > 0) {
      printTable(rows);
    } else {
      console.log('no matching rows found!');
    }
  }
}
