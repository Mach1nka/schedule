export interface ScheduleMockEvents {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string;
  timeZone: string;
  startDateTime: string;
  endDateTime: string;
  place: string;
  comment: string;
  startDateCrossCheck?: string;
  endDateCrossCheck?: string;
  organizers?: string;
  link?: string;
  color: string;
  feedback?: string;
  feedbackComment?: string;
  linkComment?: string
}

interface ScheduleMock {
  events: ScheduleMockEvents[];
}

export const scheduleMock: ScheduleMock = {
  events: [
    {
      id: "1",
      name: "Songbird",
      description: "Songbird - одностраничное приложение, викторина для распознавания птиц по их голосам.",
      descriptionUrl: "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md",
      type: "task",
      timeZone: "+3",
      startDateTime: "1595840880000",
      endDateTime: "1599004740000",
      place: "place1",
      comment: "comment1",
      color: "#00b1c3",
    },
    {
      id: "2",
      name: "Codewars React",
      description: "Some Codewars tasks on the React",
      descriptionUrl: "https://github.com/rolling-scopes-school/tasks/blob/f504966947a9f3e85a27f6401e7a6870f870f392/tasks/codewars-react.md",
      type: "task",
      timeZone: "+3",
      startDateTime: "1596412680000",
      endDateTime: "1600300680000",
      place: "place2",
      comment: "comment2",
      color: "#e30b0b",
    },
    {
      id: "3",
      name: "Schedule",
      description: "Schedule - расписание курса RS School.",
      descriptionUrl: "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/schedule.md",
      type: "task",
      timeZone: "+3",
      startDateTime: "1598918400000",
      endDateTime: "1600819199000",
      place: "place3",
      comment: "comment3",
      color: "#bb0be3",
    },
    {
      id: "4",
      name: "Schedule",
      description: "Schedule - расписание курса RS School.",
      descriptionUrl: "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/schedule.md",
      type: "task",
      timeZone: "+3",
      startDateTime: "1598918400000",
      endDateTime: "1600819199000",
      place: "place3",
      comment: "comment3",
      color: "#bb0be3",
    },
    {
      id: "5",
      name: "Schedule",
      description: "Schedule - расписание курса RS School.",
      descriptionUrl: "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/schedule.md",
      type: "task",
      timeZone: "+3",
      startDateTime: "1598918400000",
      endDateTime: "1600819199000",
      place: "place3",
      comment: "comment3",
      color: "#bb0be3",
    },
  ]
};
