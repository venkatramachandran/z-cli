import 'reflect-metadata';
import { container } from 'tsyringe';
import '../__fixtures__/di';
import OrganizationHandler from '../../src/handlers/OrgHandler';
import data from '../__fixtures__/organizations';
import Renderer from '../../src/services/Renderer';

describe('Organization Handler', () => {
  let oh: OrganizationHandler;
  const render = jest.spyOn(Renderer.prototype, 'render').mockImplementation(() => {});
  beforeEach(() => {
    oh = container.resolve(OrganizationHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch and render matching rows', () => {
    oh.handler({
      _: ['index'],
      $0: 'index',
      field: '_id',
      value: 1,
    });
    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenLastCalledWith([data[0]]);
  });
  it('should render an error if there are no matching rows', () => {
    oh.handler({
      _: ['index'],
      $0: 'index',
      field: '_id',
      value: 5,
    });
    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenLastCalledWith([]);
  });
});
