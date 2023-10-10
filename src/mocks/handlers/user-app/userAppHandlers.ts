import { rest } from "msw";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { SpecificAvailability } from "../../../types";
import {
  CheckAvailabilityResponseSuccess,
  CheckAvailabilityResponseSuggestion,
  FetchScheduleResponse,
} from "../../../routes/userapp/types";

/*
storeIds from 1-10 are reserved for core configurations
What is below might look weird but goal was to enable using any other storeId
and it uses default folder core_0

Sorry for dynamic import! Seemed clearer than importing all cores
*/
async function fetchData(storeId: string, type: string) {
  const number = parseInt(storeId, 10);
  const id = number && number > 0 && number <= 10 ? storeId : "0";
  const module = await import(/* @vite-ignore */ `./core_${id}/${type}`);
  return module.default;
}

const getOwner = rest.get(
  "/api/stores/:storeId/owner",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    console.log("requested owner for storeId: ", storeId);

    if (typeof storeId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid storeId"));
    }

    const data = await fetchData(storeId, "dummyOwner");
    return res(ctx.status(200), ctx.json(data));
  },
);

const getMainPageConfig = rest.get(
  "/api/stores/:storeId/main-page-config",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    console.log("requested main page config for storeId: ", storeId);

    if (typeof storeId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid storeId"));
    }
    const data = await fetchData(storeId, "dummyMainPageConfig");

    return res(ctx.status(200), ctx.json(data));
  },
);

const getItems = rest.get(
  "/api/stores/:storeId/items",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    if (typeof storeId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid storeId"));
    }
    const data = await fetchData(storeId, "dummyItems");

    return res(ctx.status(200), ctx.json(data));
  },
);

const getDetailsPageConfig = rest.get(
  "/api/stores/:storeId/details-page-config",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    console.log("requested details page config for storeId: ", storeId);

    if (typeof storeId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid storeId"));
    }
    const data = await fetchData(storeId, "dummyDetailsPageConfig");

    return res(ctx.status(200), ctx.json(data));
  },
);

const getItemDetails = rest.get(
  "/api/stores/:storeId/items/:itemId",
  async (req, res, ctx) => {
    const { storeId, itemId } = req.params;

    if (typeof storeId !== "string" || typeof itemId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid parameters"));
    }
    const data = await fetchData(storeId, `items/dummyItemInfo_1`);

    return res(ctx.status(200), ctx.json(data));
  },
);

const getCommentsList = rest.get(
  "/api/stores/:storeId/items/:itemId/comments",
  async (req, res, ctx) => {
    const { storeId, itemId } = req.params;

    if (typeof storeId !== "string" || typeof itemId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid parameters"));
    }

    const data = await fetchData(storeId, `items/dummyComments_1`);

    return res(ctx.status(200), ctx.json(data));
  },
);

const postAvailabilityCheck = rest.post(
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
    if (startHour < 13) {
      const suggestedHours = [1, 2, 3];
      const suggestions: CheckAvailabilityResponseSuggestion[] =
        await suggestedHours.map((hourOffset) => ({
          id: itemId + hourOffset,
          itemId,
          amount,
          schedule: Array.from({
            length: 7,
          }).flatMap((_, i) => {
            const currentDay = startOfWeek.add(i, "day"); // Calculates the day for the current iteration

            const morningEvent: SpecificAvailability = {
              startDateTime: currentDay.add(9, "hour").toDate().toISOString(),
              endDateTime: currentDay.add(11, "hour").toDate().toISOString(),
            };

            const afternoonEvent: SpecificAvailability = {
              startDateTime: currentDay.add(16, "hour").toDate().toISOString(),
              endDateTime: currentDay.add(19, "hour").toDate().toISOString(),
            };

            return [morningEvent, afternoonEvent];
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

const postFetchSchedule = rest.post(
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
      schedule: await Array.from({ length: 7 }).flatMap((_, i) => {
        const currentDay = startOfWeek.add(i, "day"); // Calculates the day for the current iteration

        const morningEvent: SpecificAvailability = {
          startDateTime: currentDay.add(14, "hour").toDate().toISOString(),
          endDateTime: currentDay.add(15, "hour").toDate().toISOString(),
        };

        const afternoonEvent: SpecificAvailability = {
          startDateTime: currentDay.add(17, "hour").toDate().toISOString(),
          endDateTime: currentDay.add(18, "hour").toDate().toISOString(),
        };

        return [morningEvent, afternoonEvent];
      }),
    };

    return res(ctx.status(200), ctx.json(response));
  },
);

export const userAppHandlers = [
  getOwner,
  getMainPageConfig,
  getDetailsPageConfig,
  getItems,
  getItemDetails,
  getCommentsList,
  postAvailabilityCheck,
  postFetchSchedule,
];
