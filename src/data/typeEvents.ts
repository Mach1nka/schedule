export interface ScheduleMockTypesEvents {
  id: string;
  name: string;
  descriptionUrl: string;
  crossCheck: string;
  color: string;
  type?: string;
}
export const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_FORMAT_CALENDAR = 'YYYY-MM-DD';

export const typeEvents = [
  {
    name: 'Task',
    id: '1',
    crossCheck: true,
    descriptionUrl: true,
    color: 'rgba(183, 235, 143, 1)',
  },
  {
    name: 'Self Education',
    id: '2',
    crossCheck: false,
    descriptionUrl: false,
    color: 'rgba(211, 173, 247, 1)',
  },
  {
    name: 'YouTube Stream',
    id: '3',
    crossCheck: false,
    descriptionUrl: false,
    color: 'rgba(255, 231, 186, 1)',
  },
  {
    name: 'Elective/YouTube Stream',
    id: '4',
    crossCheck: false,
    descriptionUrl: false,
    color: 'rgba(255, 229, 143, 1)',
  },
  {
    name: 'Test',
    id: '5',
    crossCheck: false,
    descriptionUrl: false,
    color: 'rgba(135, 232, 222, 1)',
  },
  {
    name: 'New',
    id: '6',
    crossCheck: true,
    descriptionUrl: true,
    color: 'rgba(255, 173, 210, 1)',
  },
];

