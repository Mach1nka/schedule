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

    crossCheck: true,
    descriptionUrl: true,
    color: '',
  },
  {
    name: 'Self Education',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'YouTube Stream',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'Elective/YouTube Stream',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'Test',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'New',
    crossCheck: true,
    descriptionUrl: true,
    color: '',
  },
];

