import { Core } from "../../types";

export const askForAmount = (core: Core) => core.uniqueness === false;

export const askForSubItems = (core: Core) => {
  const {
    flexibility: f,
    simultaneous: s,
    uniqueness: u,
    periodicity: p,
    specificReservation: r,
  } = core;

  return (
    ((!f && !s && !u && p && !r) ||
      (!f && s && !u && !p && r) ||
      (!f && s && !u && p && !r)) === true
  );
};
