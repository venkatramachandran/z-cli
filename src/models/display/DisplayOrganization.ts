import Organization from '../Organization';
import Ticket from '../Ticket';
import User from '../User';

export default interface DisplayOrganization extends Organization {
  user_names?: User['name'][];
  tickets?: Ticket['url'][];
}
