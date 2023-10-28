import { setupWorker } from "msw";
import { userAppHandlers } from "./handlers/user-app/userAppHandlers";
import { adminAppHandlers } from "./handlers/admin-app/adminAppHandlers";

export const worker = setupWorker(...userAppHandlers, ...adminAppHandlers);
