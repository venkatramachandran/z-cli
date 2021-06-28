import { inject, singleton } from 'tsyringe';
import { Logger } from 'winston';
import CliInput from '../models/CliInput';
import Ticket from '../models/Ticket';
import TicketService from '../services/TicketService';
import Renderer from '../services/Renderer';
import DisplayTicket from '../models/display/DisplayTicket';
import OrganizationService from '../services/OrganizationService';
import UserService from '../services/UserService';

@singleton()
export default class TicketHandler {
  constructor(private readonly service: TicketService,
    private readonly organizationService: OrganizationService,
    private readonly userService: UserService,
    private readonly renderer: Renderer,
    @inject('logger') private logger: Logger) {}

  public handler(input: CliInput): void {
    this.logger.debug(`input: ${JSON.stringify(input)}`);
    const tickets = this.service.search({
      key: input.field as keyof Ticket,
      value: input.value,
    });
    this.renderer.render(tickets.map((t: Ticket) => this.mapTicket(t)));
  }

  private mapTicket(t: Ticket): DisplayTicket {
    const dt: DisplayTicket = t;
    if (t.organization_id) {
      const [org, ...rest] = this.organizationService.search({ // eslint-disable-line @typescript-eslint/no-unused-vars
        key: '_id',
        value: t.organization_id,
      });
      dt.organization_name = org?.name;
    }
    if (t.assignee_id) {
      const [user, ...rest] = this.userService.search({ // eslint-disable-line @typescript-eslint/no-unused-vars
        key: '_id',
        value: t.assignee_id,
      });
      dt.assigned_to = user.name;
    }
    return dt;
  }
}
