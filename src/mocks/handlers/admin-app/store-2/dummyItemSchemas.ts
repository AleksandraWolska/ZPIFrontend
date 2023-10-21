import { ItemSchema } from "../../../../routes/admin-app/types";

const dummyItemSchemas: ItemSchema[] = [
  {
    item: {
      id: "1",
      active: true,
      title: "Office hours",
      subtitle: "",
      description: "",
      image: "",
      customAttributeList: [
        {
          id: "1",
          name: "Teacher",
          value: "John Doe",
        },
        {
          id: "2",
          name: "Target Students",
          value: "Bachelor",
        },
        {
          id: "3",
          name: "Topic",
          value: "Machine Learning",
        },
      ],
    },
    options: {
      schedule: {
        scheduledSlots: [
          {
            startDateTime: "2021-10-27T10:00:00.000Z",
            endDateTime: "2021-10-27T10:15:00.000Z",
          },
          {
            startDateTime: "2021-10-27T10:15:00.000Z",
            endDateTime: "2021-10-27T10:30:00.000Z",
          },
          {
            startDateTime: "2021-10-27T10:30:00.000Z",
            endDateTime: "2021-10-27T10:45:00.000Z",
          },
          {
            startDateTime: "2021-10-27T10:45:00.000Z",
            endDateTime: "2021-10-27T11:00:00.000Z",
          },
          {
            startDateTime: "2021-10-27T11:00:00.000Z",
            endDateTime: "2021-10-27T11:15:00.000Z",
          },
          {
            startDateTime: "2021-10-27T11:015:00.000Z",
            endDateTime: "2021-10-27T11:30:00.000Z",
          },
        ],
      },
    },
  },
  {
    item: {
      id: "2",
      active: true,
      title: "Office hours",
      subtitle: "",
      description: "",
      image: "",
      customAttributeList: [
        {
          id: "1",
          name: "Teacher",
          value: "Jane Doe",
        },
        {
          id: "2",
          name: "Target Students",
          value: "Master",
        },
        {
          id: "3",
          name: "Topic",
          value: "Data Science",
        },
      ],
    },
    options: {
      schedule: {
        scheduledSlots: [
          {
            startDateTime: "2021-10-30T10:00:00.000Z",
            endDateTime: "2021-10-30T10:15:00.000Z",
          },
          {
            startDateTime: "2021-10-30T10:15:00.000Z",
            endDateTime: "2021-10-30T10:30:00.000Z",
          },
          {
            startDateTime: "2021-10-30T10:30:00.000Z",
            endDateTime: "2021-10-30T10:45:00.000Z",
          },
          {
            startDateTime: "2021-10-30T10:45:00.000Z",
            endDateTime: "2021-10-30T11:00:00.000Z",
          },
          {
            startDateTime: "2021-10-30T11:00:00.000Z",
            endDateTime: "2021-10-30T11:15:00.000Z",
          },
          {
            startDateTime: "2021-10-30T11:015:00.000Z",
            endDateTime: "2021-10-30T11:30:00.000Z",
          },
        ],
      },
    },
  },
];

export default dummyItemSchemas;
