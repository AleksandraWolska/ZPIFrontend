import { rest } from "msw";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { jwtDecode } from "jwt-decode";
import {
  CheckAvailabilityResponseSuccess,
  CheckAvailabilityResponseSuggestion,
  FetchScheduleResponse,
} from "../routes/userapp/types";
import { Availability, Reservation } from "../types";
import { fetchData, getStoreId, getToken, incorrectToken } from "./utils";
import { importItems } from "./itemsHandlers";

const importReservations = async (storeId: string) => {
  try {
    return (await fetchData(storeId, "reservations")) as Reservation[];
  } catch {
    return null;
  }
};

const importAdminReservations = async (token: string) => {
  const decoded = jwtDecode(token) as { email: string };
  const storeId = getStoreId(decoded.email);
  return importReservations(storeId);
};

const getReservationsAdmin = rest.get(
  "/api/admin/reservations",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const reservations = await importAdminReservations(token);

    return res(ctx.status(200), ctx.json(reservations));
  },
);

const confirmReservation = rest.put(
  "/api/admin/reservations/:reservationId/confirm",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { reservationId } = req.params;

    const reservations = await importAdminReservations(token);

    if (!reservations) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    const idx = reservations.findIndex((i) => i.id === reservationId);

    if (idx === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: "Reservation not found." }),
      );
    }

    reservations[idx].confirmed = true;

    return res(
      ctx.status(200),
      ctx.json({ message: "Reservation confirmed." }),
    );
  },
);

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
  const body = await req.json();

  // const items7 = (await importItems("7")) || [];
  // const items8 = (await importItems("8")) || [];
  // const items9 = (await importItems("9")) || [];
  // const items10 = (await importItems("10")) || [];
  // const items = [...items7, ...items8, ...items9, ...items10];

  const items = await importItems("7");

  const item = items.find((i) => i.id === body.itemId);

  item!.status.availability = [
    {
      startDateTime: "2023-11-06T10:00:00.000Z",
      endDateTime: "2023-11-06T11:00:00.000Z",
      type: "continuous",
    },
  ];

  console.log("body", body);

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

export const reservationHandlers = [
  getReservationsAdmin,
  confirmReservation,
  checkAvailability,
  reserve,
  fetchSchedule,
];
