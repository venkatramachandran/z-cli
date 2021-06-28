import BaseModel from './BaseModel';

export default interface Organization extends BaseModel<number> {
  url: string;
  external_id: string;
  name: string;
  domain_names: string[];
  created_at: string;
  details: string;
  shared_tickets: boolean;
  tags: string[];
}

export const OrganizationFields: string[] = [
  '_id',
  'url',
  'name',
  'domain_names',
  'created_at',
  'details',
  'shared_tickets',
  'tags',
];
