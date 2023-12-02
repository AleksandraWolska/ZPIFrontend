import { Core, Item, StoreConfig } from "../../../types";

export const askForItemAmount = (core: Core) => {
  const {
    flexibility: f,
    simultaneous: s,
    uniqueness: u,
    periodicity: p,
    specificReservation: r,
  } = core;

  return (
    ((!f && s && !p && !r) ||
      (f && !s && !u) ||
      (f && s && !u) ||
      (f && s && u)) === true
  );
};

export const askForSubItemAmount = (core: Core) => {
  const {
    flexibility: f,
    simultaneous: s,
    periodicity: p,
    specificReservation: r,
  } = core;

  return (!f && s && p && !r) === true;
};

export const askForSubItemSchedule = (core: Core) => {
  const {
    flexibility: f,
    simultaneous: s,
    periodicity: p,
    specificReservation: r,
  } = core;

  return (!f && s && p && !r) === true || (!f && !s && p) === true;
};

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

export function validateItem(item: Item, storeConfig: StoreConfig) {
  if (!item.attributes.title) {
    return false;
  }

  return item.customAttributeList.every((attribute) => {
    const spec = storeConfig.customAttributesSpec.find(
      (c) => c.id === attribute.id,
    );

    return !(
      spec?.isRequired &&
      ["", null, undefined].some((v) => v === attribute.value)
    );
  });
}