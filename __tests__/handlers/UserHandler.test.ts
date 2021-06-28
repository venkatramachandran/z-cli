import 'reflect-metadata';
import { container } from 'tsyringe';
import '../__fixtures__/di';
import UserHandler from '../../src/handlers/UserHandler';
import Renderer from '../../src/services/Renderer';
import data from '../__fixtures__/users';

describe('User Handler', () => {
  let uh: UserHandler;
  const render = jest.spyOn(Renderer.prototype, 'render').mockImplementation(() => {});
  beforeEach(() => {
    uh = container.resolve(UserHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and render matching rows', () => {
    uh.handler({
      _: ['index'],
      $0: 'index',
      field: '_id',
      value: 1,
    });
    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenLastCalledWith([data[0]]);
  });
  it('should render and error if there are no matching rows', () => {
    uh.handler({
      _: ['index'],
      $0: 'index',
      field: '_id',
      value: 5,
    });
    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenLastCalledWith([]);
  });
});
