import Value from './Value';

export default interface QueryParam<T> {
  key: keyof T;
  value: Value
}
