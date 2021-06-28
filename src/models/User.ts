import BaseModel from './BaseModel';

export default interface User extends BaseModel<number> {
  url: string;
  external_id: string;
  name: string;
  alias?: string;
  created_at: string;
  active: boolean;
  verified?: boolean;
  shared: boolean;
  locale?: Locale;
  timezone?: string;
  last_login_at: string;
  email?: string;
  phone: string;
  signature: string;
  organization_id?: number;
  tags: string[];
  suspended: boolean;
  role: Role;
}

export enum Locale {
  DeCH = 'de-CH',
  EnAU = 'en-AU',
  ZhCN = 'zh-CN',
}

export enum Role {
  Admin = 'admin',
  Agent = 'agent',
  EndUser = 'end-user',
}

export const UserFields: string[] = [
  '_id',
  'url',
  'external_id',
  'name',
  'alias',
  'created_at',
  'active',
  'verified',
  'shared',
  'locale',
  'timezone',
  'last_login_at',
  'email',
  'phone',
  'signature',
  'organization_id',
  'tags',
  'suspended',
  'role',
];
