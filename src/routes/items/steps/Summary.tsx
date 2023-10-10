import { NewItemSchema } from "../types";
import { useNewItemSchemaConfig } from "../NewItemSchemaProvider";

function Summary() {
  const { newItemSchema } = useNewItemSchemaConfig();

  return <div>{JSON.stringify(parseDates(newItemSchema))}</div>;
}

function parseDates(newItemSchema: NewItemSchema) {
  if ("startDate" in newItemSchema.options.schedule) {
    return {
      ...newItemSchema,
      options: {
        ...newItemSchema.options,
        schedule: {
          startDate:
            newItemSchema.options.schedule.startDate.format("DD.MM.YYYY"),
          endDate: newItemSchema.options.schedule.endDate.format("DD.MM.YYYY"),
          reservationStartTime:
            newItemSchema.options.schedule.reservationStartTime.format("HH:mm"),
          reservationEndTime:
            newItemSchema.options.schedule.reservationEndTime.format("HH:mm"),
        },
      },
    };
  }

  return newItemSchema;
}

export default Summary;
