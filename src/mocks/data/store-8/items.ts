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
    schedule,
    active: true,
    mark: 4.5,
    availability: calculateAvailability(schedule),
    earliestStartHour: 5,
    latestEndHour: 20,
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
    schedule,
    active: true,
    mark: 4.8,
    availability: calculateAvailability(schedule),
    earliestStartHour: 5,
    latestEndHour: 20,
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
    schedule,
    active: true,
    mark: 4.6,
    availability: calculateAvailability(schedule),
    earliestStartHour: 5,
    latestEndHour: 20,
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
    schedule,
    active: true,
    mark: 4,
    availability: calculateAvailability(schedule),
    earliestStartHour: 5,
    latestEndHour: 20,
  },
];
