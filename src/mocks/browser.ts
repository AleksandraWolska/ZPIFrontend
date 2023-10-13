import { setupWorker } from "msw";
import { todosHandlers } from "./handlers/todosHandlers";
import { userAppHandlers } from "./handlers/user-app/userAppHandlers";
import { adminAppHandlers } from "./handlers/admin-app/adminAppHandlers";

export const worker = setupWorker(
  ...todosHandlers,
  ...userAppHandlers,
  ...adminAppHandlers,
);
