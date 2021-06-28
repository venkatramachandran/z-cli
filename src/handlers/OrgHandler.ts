import { inject, singleton } from 'tsyringe';
import { Logger } from 'winston';
import CliInput from '../models/CliInput';
import DisplayOrganization from '../models/display/DisplayOrganization';
import Organization from '../models/Organization';
import Ticket from '../models/Ticket';
import User from '../models/User';
import OrganizationService from '../services/OrganizationService';
import Renderer from '../services/Renderer';
import TicketService from '../services/TicketService';
import UserService from '../services/UserService';

@singleton()
export default class OrganizationHandler {
  constructor(
    private readonly service: OrganizationService,
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
    private readonly renderer: Renderer,
    @inject('logger') private logger: Logger,
  ) {}

  public handler(input: CliInput): void {
    this.logger.debug(`input: ${JSON.stringify(input)}`);
    const organizations = this.service.search({
      key: input.field as keyof Organization,
      value: input.value,
    });
    this.logger.debug(`output: ${JSON.stringify(organizations, null, 2)}`);
    this.renderer.render(organizations.map((o: Organization) => this.mapOrganization(o)));
  }

  private mapOrganization(o: Organization): DisplayOrganization {
    const d: DisplayOrganization = o;
    d.user_names = this.userService.search({
      key: 'organization_id',
      value: o._id,
    }).map((u: User) => u.name);
    d.tickets = this.ticketService.search({
      key: 'organization_id',
      value: o._id,
    }).map((t: Ticket) => t.url);
    return d;
  }
}
