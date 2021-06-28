import Organization from '../Organization';
import Ticket from '../Ticket';
import User from '../User';

export default interface DisplayUser extends User {
  organization_name?: Organization['name'];
  tickets?: Ticket['url'][];
}
