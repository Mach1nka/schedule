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
    type: 'task',
    crossCheck: true,
    descriptionUrl: true,
    color: '',
  },
  {
    name: 'Self Education',
    type: 'selfEducation',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'YouTube Stream',
    type: 'youTubeStream',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'Elective/YouTube Stream',
    type: 'electiveYouTubeStream',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'Test',
    type: 'test',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'New',
    type: 'new',
    crossCheck: true,
    descriptionUrl: true,
    color: '',
  },
];

