import Organization from '../../src/models/Organization';

const data: Organization[] = [
  {
    _id: 1,
    url: 'http://url1',
    external_id: '1a',
    name: 'org1',
    domain_names: ['domain1'],
    created_at: '',
    shared_tickets: false,
    details: '',
    tags: [],
  },
  {
    _id: 2,
    url: 'http://url2',
    external_id: '2a',
    name: 'org2',
    domain_names: ['domain2'],
    created_at: '',
    shared_tickets: false,
    details: '',
    tags: [],
  },
  {
    _id: 3,
    url: 'http://url3',
    external_id: '2a',
    name: 'org3',
    domain_names: ['domain3'],
    created_at: '',
    shared_tickets: false,
    details: '',
    tags: [],
  },
  {
    _id: 4,
    url: 'http://url4',
    external_id: '4a',
    name: 'org4',
    domain_names: [''],
    created_at: '',
    shared_tickets: false,
    details: '',
    tags: [],
  },
];

export default data;
