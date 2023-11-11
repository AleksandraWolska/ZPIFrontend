import { Item } from "../../../types";
import { calculateAvailability } from "../common/availability";
import { schedule } from "../common/schedule";

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
      schedule,
    },
    status: {
      active: true,
      mark: 4.5,
      availability: calculateAvailability(schedule),
      earliestStart: "2023-10-05T06:00:00Z",
      latestEnd: "2023-10-05T20:00:00Z",
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
      schedule,
    },
    status: {
      active: true,
      mark: 4.8,
      availability: calculateAvailability(schedule),
      earliestStart: "2023-10-05T04:00:00Z",
      latestEnd: "2023-10-05T21:00:00Z",
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
      schedule,
    },
    status: {
      active: true,
      mark: 4.6,
      availability: calculateAvailability(schedule),
      earliestStart: "2023-10-05T04:00:00Z",
      latestEnd: "2023-10-05T21:00:00Z",
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
      schedule,
    },
    status: {
      active: true,
      mark: 4,
      availability: calculateAvailability(schedule),
      earliestStart: "2023-10-05T06:00:00Z",
      latestEnd: "2023-10-05T22:00:00Z",
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
      schedule,
    },
    status: {
      active: true,
      mark: 4.7,
      availability: calculateAvailability(schedule),
      earliestStart: "2023-10-05T04:00:00Z",
      latestEnd: "2023-10-05T21:00:00Z",
    },
  },
];
