import { setupWorker } from "msw";
import { todosHandlers } from "./handlers/todosHandlers";
import { userAppHandlers } from "./handlers/user-app/userAppHandlers";
import { itemsHandlers } from "./handlers/items/itemsHandlers";

export const worker = setupWorker(
  ...todosHandlers,
  ...userAppHandlers,
  ...itemsHandlers,
);
