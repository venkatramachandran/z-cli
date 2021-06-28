import Organization from '../Organization';
import Ticket from '../Ticket';
import User from '../User';

export default interface DisplayTicket extends Ticket {
  assigned_to?: User['name'];
  organization_name?: Organization['name'];
}
