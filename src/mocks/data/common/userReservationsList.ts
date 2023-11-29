import { UserReservation } from "../../../routes/userapp/types";

const userReservationsList: UserReservation[] = [
  {
    reservationId: "1",
    item: {
      id: "1",
      title: "Sample Item 1",
      subtitle: "Subtitle 1",
    },
    subItems: [
      {
        id: "1",
        title: "Subitem 1",
        subtitle: "Subitem Subtitle 1",
        startDateTime: "2024-02-02T14:00:00",
        endDateTime: "2024-02-02T16:00:00",
      },
      { id: "1", title: "Subitem 2", subtitle: "Subitem Subtitle 2" },
    ],

    startDateTime: "2023-10-25T08:00:00Z",
    endDateTime: "2023-10-25T10:00:00Z",
    message: "halo to jest wiadomość",
    confirmed: true,
    status: "active",
  },
  {
    reservationId: "2",
    item: {
      id: "2",
      title: "Sample Item 2",
      subtitle: "Subtitle 2",
    },
    startDateTime: "2023-10-26T09:00:00Z",
    confirmed: true,
    status: "cancelled_by_user",
  },
  {
    reservationId: "3",
    item: {
      id: "3",
      title: "Sample Item 3",
      subtitle: "Subtitle 3",
    },
    startDateTime: "2023-10-27T10:00:00Z",
    endDateTime: "2023-10-27T12:00:00Z",
    confirmed: false,
    status: "active",
  },
  {
    reservationId: "4",
    item: {
      id: "4",
      title: "Sample Item 4",
      subtitle: "Subtitle 4",
    },
    startDateTime: "2023-10-28T14:00:00Z",
    endDateTime: "2023-10-28T16:00:00Z",
    confirmed: true,
    status: "active",
  },
  {
    reservationId: "5",
    item: {
      id: "5",
      title: "Sample Item 5",
      subtitle: "Subtitle 5",
    },
    startDateTime: "2023-10-29T15:00:00Z",
    endDateTime: "2023-10-29T17:00:00Z",
    confirmed: false,
    status: "cancelled_by_admin",
  },
];

export default userReservationsList;
