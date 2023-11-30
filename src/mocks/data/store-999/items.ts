import { Item } from "../../../types";
import { schedule } from "../common/schedule";
import { calculateAvailability } from "../common/availability";

export const items: Item[] = [
  {
    id: "1",
    attributes: {
      title: "Mercedes of your dreams",
      subtitle: "",
      description: "",
      image:
        "https://images.pexels.com/photos/756789/pexels-photo-756789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Brand",
        value: "Mercedes",
      },
      {
        id: "2",
        name: "Model",
        value: "E-Class",
      },
      {
        id: "3",
        name: "Year",
        value: 2019,
      },
      {
        id: "4",
        name: "Electric",
        value: false,
      },
    ],
    schedule,
    active: true,
    mark: 4.5,
    availabilities: calculateAvailability(schedule),
    earliestStartHour: 6,
    latestEndHour: 20,
  },
  {
    id: "2",
    attributes: {
      title: "Audi you always wanted",
      subtitle: "",
      description: "",
      image:
        "https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Brand",
        value: "Audi",
      },
      {
        id: "2",
        name: "Model",
        value: "A3",
      },
      {
        id: "3",
        name: "Year",
        value: 2021,
      },
      {
        id: "4",
        name: "Electric",
        value: false,
      },
    ],
    schedule,
    active: true,
    mark: 4.5,
    availabilities: calculateAvailability(schedule),
    earliestStartHour: 6,
    latestEndHour: 20,
  },
];
