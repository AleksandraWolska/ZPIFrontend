import { Core } from "../../types";

export const askForAmount = (core: Core) => core.uniqueness === false;

export const askForSubItems = (core: Core) => {
  const {
    simultaneous: s,
    uniqueness: u,
    periodicity: p,
    specificReservation: r,
  } = core;

  const f = core.scheduleType !== "fixed";

  return (
    ((!f && !s && !u && p && !r) ||
      (!f && s && !u && !p && r) ||
      (!f && s && !u && p && !r)) === true
  );
};
