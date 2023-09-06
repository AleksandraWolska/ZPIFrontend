export const SCHEMA_STEPS = {
  TIME_FRAME: "TIME_FRAME",
  GRANULARITY: "GRANULARITY",
  USERS_PER_ENTITY: "USERS_PER_ENTITY",
} as const;

type ObjectValues<T> = T[keyof T];

export type SchemaStep = ObjectValues<typeof SCHEMA_STEPS>;
