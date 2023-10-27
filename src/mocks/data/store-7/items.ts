import { Item } from "../../../types";
import { availability } from "./availability";

export const items: Item[] = [
  {
    id: "1",
    attributes: {
      title: "Gaming Laptop",
      subtitle: "High-performance gaming laptop",
      description: "",
      image: "https://api.slingacademy.com/public/sample-photos/2.jpeg",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Brand",
        value: "ASUS",
      },
      {
        id: "2",
        name: "Processor",
        value: "Intel Core i7",
      },
      {
        id: "3",
        name: "RAM",
        value: "16",
      },
      {
        id: "4",
        name: "Storage",
        value: "512GB SSD",
      },
      {
        id: "5",
        name: "Available",
        value: "true",
      },
    ],
    initialSettings: {
      amount: 10,
      schedule: {
        scheduledRanges: [
          {
            startDateTime: "2023-11-06T06:00:00.000Z",
            endDateTime: "2023-11-06T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-07T06:00:00.000Z",
            endDateTime: "2023-11-07T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-08T06:00:00.000Z",
            endDateTime: "2023-11-08T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-09T06:00:00.000Z",
            endDateTime: "2023-11-09T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-10T06:00:00.000Z",
            endDateTime: "2023-11-10T10:00:00.000Z",
          },
        ],
      },
    },
    status: {
      active: true,
      mark: 4.5,
      availableAmount: 10,
      availability,
    },
  },
  {
    id: "2",
    attributes: {
      title: "MacBook Pro",
      subtitle: "Apple MacBook Pro with Retina display",
      description: "",
      image: "https://api.slingacademy.com/public/sample-photos/5.jpeg",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Brand",
        value: "Apple",
      },
      {
        id: "2",
        name: "Processor",
        value: "Intel Core i5",
      },
      {
        id: "3",
        name: "RAM",
        value: 8,
      },
      {
        id: "4",
        name: "Storage",
        value: "256GB SSD",
      },
      {
        id: "5",
        name: "Available",
        value: true,
      },
    ],
    initialSettings: {
      amount: 15,
      schedule: {
        scheduledRanges: [
          {
            startDateTime: "2023-11-06T06:00:00.000Z",
            endDateTime: "2023-11-06T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-07T06:00:00.000Z",
            endDateTime: "2023-11-07T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-08T06:00:00.000Z",
            endDateTime: "2023-11-08T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-09T06:00:00.000Z",
            endDateTime: "2023-11-09T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-10T06:00:00.000Z",
            endDateTime: "2023-11-10T10:00:00.000Z",
          },
        ],
      },
    },
    status: {
      active: true,
      mark: 4.8,
      availableAmount: 15,
      availability,
    },
  },
  {
    id: "3",
    attributes: {
      title: "Desktop PC",
      subtitle: "Powerful desktop computer for work or play",
      description: "",
      image: "https://api.slingacademy.com/public/sample-photos/3.jpeg",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Brand",
        value: "HP",
      },
      {
        id: "2",
        name: "Processor",
        value: "AMD Ryzen 7",
      },
      {
        id: "3",
        name: "RAM",
        value: 32,
      },
      {
        id: "4",
        name: "Storage",
        value: "1TB HDD",
      },
      {
        id: "5",
        name: "Available",
        value: true,
      },
    ],
    initialSettings: {
      amount: 8,
      schedule: {
        scheduledRanges: [
          {
            startDateTime: "2023-11-06T06:00:00.000Z",
            endDateTime: "2023-11-06T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-07T06:00:00.000Z",
            endDateTime: "2023-11-07T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-08T06:00:00.000Z",
            endDateTime: "2023-11-08T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-09T06:00:00.000Z",
            endDateTime: "2023-11-09T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-10T06:00:00.000Z",
            endDateTime: "2023-11-10T10:00:00.000Z",
          },
        ],
      },
    },
    status: {
      active: true,
      mark: 4.6,
      availableAmount: 8,
      availability,
    },
  },
  {
    id: "4",
    attributes: {
      title: "Chromebook",
      subtitle: "Lightweight and affordable Chromebook",
      description: "",
      image: "https://api.slingacademy.com/public/sample-photos/4.jpeg",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Brand",
        value: "Samsung",
      },
      {
        id: "2",
        name: "Processor",
        value: "Intel Celeron",
      },
      {
        id: "3",
        name: "RAM",
        value: 4,
      },
      {
        id: "4",
        name: "Storage",
        value: "64GB eMMC",
      },
      {
        id: "5",
        name: "Available",
        value: true,
      },
    ],
    initialSettings: {
      amount: 20,
      schedule: {
        scheduledRanges: [
          {
            startDateTime: "2023-11-06T06:00:00.000Z",
            endDateTime: "2023-11-06T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-07T06:00:00.000Z",
            endDateTime: "2023-11-07T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-08T06:00:00.000Z",
            endDateTime: "2023-11-08T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-09T06:00:00.000Z",
            endDateTime: "2023-11-09T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-10T06:00:00.000Z",
            endDateTime: "2023-11-10T10:00:00.000Z",
          },
        ],
      },
    },
    status: {
      active: true,
      mark: 4,
      availableAmount: 20,
      availability,
    },
  },
  {
    id: "5",
    attributes: {
      title: "Workstation Laptop",
      subtitle: "High-performance laptop for professionals",
      description: "",
      image: "https://api.slingacademy.com/public/sample-photos/5.jpeg",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Brand",
        value: "Dell",
      },
      {
        id: "2",
        name: "Processor",
        value: "Intel Xeon",
      },
      {
        id: "3",
        name: "RAM",
        value: 32,
      },
      {
        id: "4",
        name: "Storage",
        value: "1TB NVMe SSD",
      },
      {
        id: "5",
        name: "Available",
        value: true,
      },
    ],
    initialSettings: {
      amount: 12,
      schedule: {
        scheduledRanges: [
          {
            startDateTime: "2023-11-06T06:00:00.000Z",
            endDateTime: "2023-11-06T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-07T06:00:00.000Z",
            endDateTime: "2023-11-07T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-08T06:00:00.000Z",
            endDateTime: "2023-11-08T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-09T06:00:00.000Z",
            endDateTime: "2023-11-09T16:00:00.000Z",
          },
          {
            startDateTime: "2023-11-10T06:00:00.000Z",
            endDateTime: "2023-11-10T10:00:00.000Z",
          },
        ],
      },
    },
    status: {
      active: true,
      mark: 4.7,
      availableAmount: 12,
      availability,
    },
  },
];

export default items;
