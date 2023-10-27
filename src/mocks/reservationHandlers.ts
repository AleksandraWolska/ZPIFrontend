import { rest } from "msw";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import {
  CheckAvailabilityResponseSuccess,
  CheckAvailabilityResponseSuggestion,
  FetchScheduleResponse,
} from "../routes/userapp/types";
import { Availability } from "../types";

const checkAvailability = rest.post(
  "/api/check-availability",
  async (req, res, ctx) => {
    const { startDate, endDate, itemId, amount } = await req.json();

    if (
      typeof itemId !== "string" ||
      typeof startDate !== "string" ||
      typeof endDate !== "string"
    ) {
      return res(ctx.status(400), ctx.text("Invalid input"));
    }

    const today = dayjs();
    const startOfWeek = today.startOf("week").add(1, "day"); // Moves to Monday
    const startHour = new Date(startDate).getHours();

    // If before noon
    if (startHour <= 12) {
      const suggestedHours = [1, 2, 3];
      const suggestions: CheckAvailabilityResponseSuggestion[] =
        suggestedHours.map((hourOffset) => ({
          id: itemId + hourOffset,
          itemId,
          amount,
          schedule: Array.from({
            length: 7,
          }).flatMap((_, i) => {
            const currentDay = startOfWeek.add(i, "day"); // Calculates the day for the current iteration

            const morningEvent: Availability = {
              startDateTime: currentDay.add(8, "hour").toDate().toISOString(),
              endDateTime: currentDay.add(9, "hour").toDate().toISOString(),
              type: "morning",
            };
            const event1: Availability = {
              startDateTime: currentDay.add(9, "hour").toDate().toISOString(),
              endDateTime: currentDay.add(12, "hour").toDate().toISOString(),
              type: "continuous",
            };

            const event2: Availability = {
              startDateTime: currentDay.add(12, "hour").toDate().toISOString(),
              endDateTime: currentDay.add(15, "hour").toDate().toISOString(),
              type: "slot",
            };

            const overnightEvent: Availability = {
              startDateTime: currentDay.add(16, "hour").toDate().toISOString(),
              endDateTime: currentDay.add(19, "hour").toDate().toISOString(),
              type: "overnight",
            };

            return [morningEvent, event1, event2, overnightEvent];
          }),
          suggestedStart: new Date(
            new Date(startDate).setHours(startHour + hourOffset + 1),
          ).toISOString(),
          suggestedEnd: new Date(
            new Date(endDate).setHours(startHour + hourOffset + 3),
          ).toISOString(),
        }));
      return res(ctx.status(203), ctx.json(suggestions));
    }

    // If user chose start at 13PM
    if (startHour === 13) {
      return res(ctx.status(400), ctx.text("Could not find any"));
    }

    // If user chose start after 13PM
    if (startHour > 13) {
      const responseSuccess: CheckAvailabilityResponseSuccess = {
        id: uuid(),
        itemId,
        amount,
        start: startDate,
        end: endDate,
      };
      return res(ctx.status(200), ctx.json(responseSuccess));
    }

    return res(ctx.status(400), ctx.text("Unknown error"));
  },
);

const reserve = rest.post("/api/reserve", async (req, res, ctx) => {
  const { storeId, itemId } = await req.json();

  if (typeof itemId !== "string" || typeof storeId !== "string") {
    return res(ctx.status(400), ctx.text("Invalid input"));
  }
  return res(ctx.status(200), ctx.json({ status: "ok" }));
});

const fetchSchedule = rest.post(
  "/api/fetch-schedule",
  async (req, res, ctx) => {
    const { itemId, amount } = await req.json(); // Modified here

    if (typeof itemId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid input"));
    }

    const today = dayjs();
    const startOfWeek = today.startOf("week").add(1, "day"); // Moves to Monday

    const response: FetchScheduleResponse = {
      itemId,
      amount,
      schedule: Array.from({ length: 7 }).flatMap((_, i) => {
        const currentDay = startOfWeek.add(i, "day"); // Calculates the day for the current iteration

        const morningEvent: Availability = {
          startDateTime: currentDay.add(14, "hour").toDate().toISOString(),
          endDateTime: currentDay.add(15, "hour").toDate().toISOString(),
          type: "continuous",
        };

        const afternoonEvent: Availability = {
          startDateTime: currentDay.add(17, "hour").toDate().toISOString(),
          endDateTime: currentDay.add(18, "hour").toDate().toISOString(),
          type: "continuous",
        };

        return [morningEvent, afternoonEvent];
      }),
    };

    return res(ctx.status(200), ctx.json(response));
  },
);

export const reservationHandlers = [checkAvailability, reserve, fetchSchedule];
