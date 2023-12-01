import { setupWorker } from "msw";
import { itemsHandlers } from "./itemsHandlers";
import { storeConfigHandlers } from "./storeConfigHandlers";
import { commentsHandlers } from "./commentsHandlers";
import { reservationHandlers } from "./reservationHandlers";

export const worker = setupWorker(
  ...itemsHandlers,
  ...storeConfigHandlers,
  ...commentsHandlers,
  ...reservationHandlers,
);
