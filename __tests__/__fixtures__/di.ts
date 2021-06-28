import { container } from 'tsyringe';
import winston, { Logger } from 'winston';
import User from '../../src/models/User';
import users from './users';
import organizations from './organizations';
import tickets from './tickets';
import Ticket from '../../src/models/Ticket';
import Organization from '../../src/models/Organization';

container.register<User[]>('users', { useValue: users as User[] });
container.register<Organization[]>('organizations', { useValue: organizations as Organization[] });
container.register<Ticket[]>('tickets', { useValue: tickets as Ticket[] });
const logger: Logger = winston.createLogger({ transports: [new winston.transports.Console({ silent: true })] });
container.register<Logger>('logger', { useValue: logger });
