import dayjs from "dayjs";
import { Availability, SpecificAvailability } from "../../../../../types";

const today = dayjs();
const startOfWeek = today.startOf("week").add(1, "day"); // Moves to Monday

export const dummyAvailability: Availability = Array.from({
  length: 7,
}).flatMap((_, i) => {
  const currentDay = startOfWeek.add(i, "day"); // Calculates the day for the current iteration

  const morningEvent: SpecificAvailability = {
    startDateTime: currentDay.add(7, "hour").toDate().toISOString(),
    endDateTime: currentDay.add(8, "hour").toDate().toISOString(),
    type: "morning",
  };
  const event1: SpecificAvailability = {
    startDateTime: currentDay.add(8, "hour").toDate().toISOString(),
    endDateTime: currentDay.add(21, "hour").toDate().toISOString(),
    type: "continuous",
  };

  // const event2: SpecificAvailability = {
  //   startDateTime: currentDay.add(13, "hour").toDate().toISOString(),
  //   endDateTime: currentDay.add(15, "hour").toDate().toISOString(),
  //   type: "slot",
  // };
  // const event3: SpecificAvailability = {
  //   startDateTime: currentDay.add(15, "hour").toDate().toISOString(),
  //   endDateTime: currentDay.add(17, "hour").toDate().toISOString(),
  //   type: "continuous",
  // };
  // const event4: SpecificAvailability = {
  //   startDateTime: currentDay.add(17, "hour").toDate().toISOString(),
  //   endDateTime: currentDay.add(19, "hour").toDate().toISOString(),
  //   type: "slot",
  // };
  // const event5: SpecificAvailability = {
  //   startDateTime: currentDay.add(19, "hour").toDate().toISOString(),
  //   endDateTime: currentDay.add(21, "hour").toDate().toISOString(),
  //   type: "slot",
  // };

  const overnightEvent: SpecificAvailability = {
    startDateTime: currentDay.add(21, "hour").toDate().toISOString(),
    endDateTime: currentDay.add(23, "hour").toDate().toISOString(),
    type: "overnight",
  };

  return [morningEvent, event1, overnightEvent];
});

// import dayjs from "dayjs";
// import { Availability, SpecificAvailability } from "../../../../../types";

// const today = dayjs();
// const startOfWeek = today.startOf("week").add(1, "day"); // Moves to Monday

// export const dummyAvailability: Availability = Array.from({
//   length: 7,
// }).flatMap((_, i) => {
//   const currentDay = startOfWeek.add(i, "day"); // Calculates the day for the current iteration

//   const morningEvent: SpecificAvailability = {
//     startDateTime: currentDay.add(7, "hour").toDate().toISOString(),
//     endDateTime: currentDay.add(8, "hour").toDate().toISOString(),
//     type: "morning",
//   };
//   const event1: SpecificAvailability = {
//     startDateTime: currentDay.add(8, "hour").toDate().toISOString(),
//     endDateTime: currentDay.add(11, "hour").toDate().toISOString(),
//     type: "slot",
//   };

//   const event2: SpecificAvailability = {
//     startDateTime: currentDay.add(13, "hour").toDate().toISOString(),
//     endDateTime: currentDay.add(15, "hour").toDate().toISOString(),
//     type: "slot",
//   };
//   const event3: SpecificAvailability = {
//     startDateTime: currentDay.add(15, "hour").toDate().toISOString(),
//     endDateTime: currentDay.add(17, "hour").toDate().toISOString(),
//     type: "continuous",
//   };
//   const event4: SpecificAvailability = {
//     startDateTime: currentDay.add(17, "hour").toDate().toISOString(),
//     endDateTime: currentDay.add(19, "hour").toDate().toISOString(),
//     type: "slot",
//   };
//   const event5: SpecificAvailability = {
//     startDateTime: currentDay.add(19, "hour").toDate().toISOString(),
//     endDateTime: currentDay.add(21, "hour").toDate().toISOString(),
//     type: "slot",
//   };

//   const overnightEvent: SpecificAvailability = {
//     startDateTime: currentDay.add(21, "hour").toDate().toISOString(),
//     endDateTime: currentDay.add(23, "hour").toDate().toISOString(),
//     type: "overnight",
//   };

//   return [morningEvent, event1, event2, event3, event4, event5, overnightEvent];
// });
