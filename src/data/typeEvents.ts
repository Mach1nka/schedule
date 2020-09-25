export interface ScheduleMockTypesEvents {
  id: string;
  name: string;
  descriptionUrl: string;
  crossCheck: string;
  color: string;
  type?: string;
}

export const typeEvents = [
  {
    name: 'Task',
    id: '1',
    crossCheck: true,
    descriptionUrl: true,
    color: '',
  },
  {
    name: 'Self Education',
    id: '2',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'YouTube Stream',
    id: '3',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'Elective/YouTube Stream',
    id: '4',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'Test',
    id: '5',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'New',
    id: '6',
    crossCheck: true,
    descriptionUrl: true,
    color: '',
  },
];

