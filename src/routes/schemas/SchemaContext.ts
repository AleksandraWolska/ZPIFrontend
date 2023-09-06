import { createContext } from "react";
import { Granularity, TimeFrame } from "./types";

export type SchemaContextType = {
  setTimeFrame: (timeFrame: TimeFrame) => void;
  setGranularity: (granularity: Granularity) => void;
};

export const SchemaContext = createContext<SchemaContextType | null>(null);
