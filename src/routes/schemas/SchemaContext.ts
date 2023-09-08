import { createContext } from "react";
import {
  Periodicity,
  EntityUniqueness,
  GapBetween,
  Granularity,
  Schema,
  SpecificSeats,
  TimeFrame,
  UsersPerOffer,
} from "./types";

export type SchemaContextType = {
  schema: Partial<Schema>;
  setTimeFrame: (timeFrame: TimeFrame) => void;
  setGranularity: (granularity: Granularity) => void;
  setUsersPerOffer: (usersPerOffer: UsersPerOffer) => void;
  setEntityUniqueness: (entityUniqueness: EntityUniqueness) => void;
  setGapBetween: (gapBetween: GapBetween) => void;
  setSpecificSeats: (specificSeats: SpecificSeats) => void;
  setPeriodicity: (periodicity: Periodicity) => void;
};

export const SchemaContext = createContext<SchemaContextType | null>(null);