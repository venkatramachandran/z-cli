import 'reflect-metadata';
import { container } from 'tsyringe';
import '../__fixtures__/di';
import TicketHandler from '../../src/handlers/TicketHandler';
import Renderer from '../../src/services/Renderer';
import data from '../__fixtures__/tickets';

describe('Ticket Handler', () => {
  let th: TicketHandler;
  const render = jest.spyOn(Renderer.prototype, 'render').mockImplementation(() => {});
  beforeEach(() => {
    th = container.resolve(TicketHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and render matching rows', () => {
    th.handler({
      _: ['index'],
      $0: 'index',
      field: '_id',
      value: 1,
    });
    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenLastCalledWith([data[0]]);
  });
  it('should render and error if there are no matching rows', () => {
    th.handler({
      _: ['index'],
      $0: 'index',
      field: '_id',
      value: 5,
    });
    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenLastCalledWith([]);
  });
});
