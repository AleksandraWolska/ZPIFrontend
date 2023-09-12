import { createContext } from "react";
import { Schema, SchemaStep } from "./types";

export type SchemaContextType = {
  schema: Schema;
  setTimeFrame: (timeFrame: Schema["mechanics"]["timeFrame"]) => void;
  setGranularity: (granularity: Schema["mechanics"]["granularity"]) => void;
  setUsersPerOffer: (
    usersPerOffer: Schema["mechanics"]["usersPerOffer"],
  ) => void;
  setEntityUniqueness: (
    entityUniqueness: Schema["mechanics"]["entityUniqueness"],
  ) => void;
  setGapBetween: (gapBetween: Schema["mechanics"]["gapBetween"]) => void;
  setSpecificSeats: (
    specificSeats: Schema["mechanics"]["specificSeats"],
  ) => void;
  setPeriodicity: (periodicity: Schema["mechanics"]["periodicity"]) => void;
  withdrawMechanics: (step: SchemaStep) => void;
  setCustomParams: (customParams: Schema["customParams"]) => void;
  setRatingOptions: (ratingOptions: Partial<Schema["ratingOptions"]>) => void;
  setCommentsOptions: (
    commentsOptions: Partial<Schema["commentsOptions"]>,
  ) => void;
};

export const SchemaContext = createContext<SchemaContextType | null>(null);
