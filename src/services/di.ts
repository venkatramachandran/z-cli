import { container } from 'tsyringe';
import { Logger } from 'winston';
import User from '../models/User';
import users from '../../data/users.json';
import organizations from '../../data/organizations.json';
import tickets from '../../data/tickets.json';
import Ticket from '../models/Ticket';
import Organization from '../models/Organization';
import logger from './Logger';

container.register<User[]>('users', { useValue: users as User[] });
container.register<Organization[]>('organizations', { useValue: organizations as Organization[] });
container.register<Ticket[]>('tickets', { useValue: tickets as Ticket[] });
container.register<Logger>('logger', { useValue: logger });
