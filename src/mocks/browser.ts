import { setupWorker } from "msw";
import { todosHandlers } from "./handlers/todosHandlers";
import { userAppHandlers } from "./handlers/user-app/userAppHandlers";

export const worker = setupWorker(...todosHandlers, ...userAppHandlers);
