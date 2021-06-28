import { inject, singleton } from 'tsyringe';
import { Logger } from 'winston';
import CliInput from '../models/CliInput';
import User from '../models/User';
import UserService from '../services/UserService';
import Renderer from '../services/Renderer';
import OrganizationService from '../services/OrganizationService';
import TicketService from '../services/TicketService';
import DisplayUser from '../models/display/DisplayUser';
import Ticket from '../models/Ticket';

@singleton()
export default class UserHandler {
  constructor(private readonly service: UserService,
    private readonly organizationService: OrganizationService,
    private readonly ticketService: TicketService,
    private readonly renderer: Renderer,
    @inject('logger') private logger: Logger) {}

  public handler(input: CliInput): void {
    this.logger.debug(`input: ${JSON.stringify(input)}`);
    const users = this.service.search({
      key: input.field as keyof User,
      value: input.value,
    });
    this.renderer.render(users.map((u: User) => this.mapUser(u)));
  }

  private mapUser(u: User): DisplayUser {
    const d: DisplayUser = u;
    if (u.organization_id) {
      const [org, ...rest] = this.organizationService.search({ // eslint-disable-line @typescript-eslint/no-unused-vars
        key: '_id',
        value: u.organization_id,
      });
      d.organization_name = org.name;
    }
    const t = this.ticketService.search({
      key: 'assignee_id',
      value: u._id,
    });
    d.tickets = t.map((t1: Ticket) => t1.url);
    return d;
  }
}
