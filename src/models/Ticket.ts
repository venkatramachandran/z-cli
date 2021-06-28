import BaseModel from './BaseModel';

export default interface Ticket extends BaseModel<string> {
  url: string;
  external_id: string;
  created_at: string;
  type?: Type;
  subject: string;
  description?: string;
  priority: Priority;
  status: Status;
  submitter_id: number;
  assignee_id?: number;
  organization_id?: number;
  tags: string[];
  has_incidents: boolean;
  due_at?: string;
  via: Via;
}

export enum Priority {
  High = 'high',
  Low = 'low',
  Normal = 'normal',
  Urgent = 'urgent',
}

export enum Status {
  Closed = 'closed',
  Hold = 'hold',
  Open = 'open',
  Pending = 'pending',
  Solved = 'solved',
}

export enum Type {
  Incident = 'incident',
  Problem = 'problem',
  Question = 'question',
  Task = 'task',
}

export enum Via {
  Chat = 'chat',
  Voice = 'voice',
  Web = 'web',
}

export const TicketFields: string[] = [
  '_id',
  'url',
  'external_id',
  'created_at',
  'type',
  'subject',
  'description',
  'priority',
  'status',
  'submitter_id',
  'assignee_id',
  'organization_id',
  'tags',
  'has_incidents',
  'due_at',
  'via',
];
