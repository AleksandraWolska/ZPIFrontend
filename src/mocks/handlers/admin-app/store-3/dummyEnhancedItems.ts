import { EnhancedItem } from "../../../../routes/admin-app/types";

const dummyEnhancedItems: EnhancedItem[] = [
  {
    item: {
      id: "1",
      active: true,
      title: "Audi A4",
      subtitle: "",
      description: "",
      image:
        "https://carleasepolska.pl/uploads/2fb1b2eca05788293f0ab3948a6d446b.webp",
      customAttributeList: [
        {
          id: "1",
          name: "Manufacturer",
          value: "Audi",
        },
        {
          id: "2",
          name: "Model",
          value: "A4",
        },
        {
          id: "3",
          name: "Year",
          value: 2022,
        },
        {
          id: "4",
          name: "Passengers",
          value: 5,
        },
        {
          id: "5",
          name: "Power",
          value: 150,
        },
        {
          id: "6",
          name: "Automatic",
          value: true,
        },
      ],
    },
    initialStatus: {
      schedule: {
        scheduledRanges: [
          {
            startDateTime: "2021-11-06T06:00:00.000Z",
            endDateTime: "2021-11-06T16:00:00.000Z",
          },
          {
            startDateTime: "2021-11-07T06:00:00.000Z",
            endDateTime: "2021-11-07T16:00:00.000Z",
          },
          {
            startDateTime: "2021-11-08T06:00:00.000Z",
            endDateTime: "2021-11-08T16:00:00.000Z",
          },
          {
            startDateTime: "2021-11-09T06:00:00.000Z",
            endDateTime: "2021-11-09T16:00:00.000Z",
          },
          {
            startDateTime: "2021-11-10T06:00:00.000Z",
            endDateTime: "2021-11-10T10:00:00.000Z",
          },
        ],
      },
    },
  },
  {
    item: {
      id: "2",
      active: false,
      title: "Mercedes C",
      subtitle: "",
      description: "",
      image:
        "https://www.motortrend.com/uploads/2022/04/2023-Mercedes-AMG-C43-sedan-9.jpg",
      customAttributeList: [
        {
          id: "1",
          name: "Manufacturer",
          value: "Mercedes",
        },
        {
          id: "2",
          name: "Model",
          value: "C",
        },
        {
          id: "3",
          name: "Year",
          value: 2023,
        },
        {
          id: "4",
          name: "Passengers",
          value: 5,
        },
        {
          id: "5",
          name: "Power",
          value: 200,
        },
        {
          id: "6",
          name: "Automatic",
          value: true,
        },
      ],
    },
    initialStatus: {
      schedule: {
        scheduledRanges: [
          {
            startDateTime: "2021-11-06T06:00:00.000Z",
            endDateTime: "2021-11-06T16:00:00.000Z",
          },
          {
            startDateTime: "2021-11-07T06:00:00.000Z",
            endDateTime: "2021-11-07T16:00:00.000Z",
          },
          {
            startDateTime: "2021-11-08T06:00:00.000Z",
            endDateTime: "2021-11-08T10:00:00.000Z",
          },
          {
            startDateTime: "2021-11-08T12:00:00.000Z",
            endDateTime: "2021-11-08T16:00:00.000Z",
          },
          {
            startDateTime: "2021-11-09T06:00:00.000Z",
            endDateTime: "2021-11-09T16:00:00.000Z",
          },
        ],
      },
    },
  },
];

export default dummyEnhancedItems;
