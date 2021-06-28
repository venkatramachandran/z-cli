import { Logger } from 'winston';
import BaseModel from '../models/BaseModel';
import QueryParam from '../types/Query';
import Value from '../types/Value';

export default abstract class BaseService<T extends BaseModel<Value>> {
  public abstract search(params: QueryParam<T>): T[];

  constructor(protected readonly data: T[], private logger: Logger) {}
}
