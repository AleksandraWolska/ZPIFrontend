import { Reservation } from "../../../types";

export const reservations: Reservation[] = [
  {
    id: "1",
    itemId: "1",
    clientEmail: "john.doe@test.pl",
    clientData: {
      name: "John Doe",
      phone: "+48 123 456 789",
      age: "18",
    },
    confirmed: true,
    startDateTime: "2023-11-02T10:00:00",
    endDateTime: "2023-11-02T12:00:00",
    amount: 1,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.",
  },
  {
    id: "2",
    itemId: "2",
    clientEmail: "jane.doe@test.pl",
    clientData: {
      name: "Jane Doe",
      phone: "+48 123 456 789",
      age: "25",
    },
    confirmed: true,
    startDateTime: "2024-02-01T12:00:00",
    endDateTime: "2024-02-01T14:00:00",
    amount: 1,
    message: "",
  },
  {
    id: "3",
    itemId: "1",
    clientEmail: "robert.smith@test.pl",
    clientData: {
      name: "Robert Smith",
      phone: "+48 987 654 321",
      age: "60",
    },
    confirmed: false,
    startDateTime: "2024-02-02T14:00:00",
    endDateTime: "2024-02-02T16:00:00",
    amount: 1,
    message:
      "C'est un message de Robert Smith. Je suis un homme important et je voudrais réserver une table pour 2 personnes.",
  },
];
