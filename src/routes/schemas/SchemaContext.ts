import { createContext } from "react";
import { Schema, SchemaStep } from "./types";

export type SchemaContextType = {
  schema: Schema;
  setLayoutConfig: (layoutConfig: Schema["layoutConfig"]) => void;
  setCoreConfigAttribute: (
    key: keyof Schema["coreConfig"],
    value: boolean,
  ) => void;
  withdrawToCoreConfig: (step: SchemaStep) => void;
  setAttributes: (attributes: Schema["attributes"]) => void;
  setRatingOptions: (ratingOptions: Partial<Schema["ratingOptions"]>) => void;
  setCommentsOptions: (
    commentsOptions: Partial<Schema["commentsOptions"]>,
  ) => void;
};

export const SchemaContext = createContext<SchemaContextType | null>(null);
