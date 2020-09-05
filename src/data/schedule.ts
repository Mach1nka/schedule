export interface ScheduleMockEvents {
  id: string;
  name: string;
  description: string,
  descriptionUrl: string,
  type: string,
  timeZone: string,
  dateTime: string,
  place: string,
  comment: string,
}

interface ScheduleMock {
  events: ScheduleMockEvents[];
}

export const scheduleMock: ScheduleMock = {
  events: [
    {
      id: "1",
      name:	"name1",
      description: "description1",
      descriptionUrl: "descriptionUrl1",
      type: "task",
      timeZone: "+3",
      dateTime: "",
      place: "place1",
      comment: "comment1",
    },
    {
      id: "2",
      name:	"name2",
      description: "description2",
      descriptionUrl: "descriptionUrl2",
      type: "task",
      timeZone: "+3",
      dateTime: "",
      place: "place2",
      comment: "comment2",
    },
    {
      id: "3",
      name:	"name3",
      description: "description3",
      descriptionUrl: "descriptionUrl3",
      type: "task",
      timeZone: "+3",
      dateTime: "",
      place: "place3",
      comment: "comment3",
    },
  ]
}
