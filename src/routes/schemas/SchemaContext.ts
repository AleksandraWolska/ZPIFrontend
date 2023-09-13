import { createContext } from "react";
import { Schema, SchemaStep } from "./types";

export type SchemaContextType = {
  schema: Schema;
  setFlexibility: (flexibility: Schema["coreConfig"]["flexibility"]) => void;
  setGranularity: (granularity: Schema["coreConfig"]["granularity"]) => void;
  setSimultaneous: (simultaneous: Schema["coreConfig"]["simultaneous"]) => void;
  setUniqueness: (uniqueness: Schema["coreConfig"]["uniqueness"]) => void;
  setGapBetween: (gapBetween: Schema["coreConfig"]["gapBetween"]) => void;
  setSpecificReservation: (
    specificReservation: Schema["coreConfig"]["specificReservation"],
  ) => void;
  setPeriodicity: (periodicity: Schema["coreConfig"]["periodicity"]) => void;
  withdrawToCoreConfig: (step: SchemaStep) => void;
  setCustomParams: (customParams: Schema["customParams"]) => void;
  setRatingOptions: (ratingOptions: Partial<Schema["ratingOptions"]>) => void;
  setCommentsOptions: (
    commentsOptions: Partial<Schema["commentsOptions"]>,
  ) => void;
};

export const SchemaContext = createContext<SchemaContextType | null>(null);
