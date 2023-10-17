import { CommentList } from "../../../../../routes/userapp/types";

const dummyComments: CommentList = [
  {
    id: "1",
    userId: "101",
    nickname: "TechGeek",
    content: "Great computer, very fast!",
    rating: 3.5,
    datetime: "2023-09-20T10:30:00",
  },
  {
    id: "2",
    userId: "102",
    nickname: "ComputerWhiz",
    content: "Impressive performance.",
    datetime: "2023-09-19T15:45:00",
  },
  {
    id: "3",
    userId: "103",
    nickname: "TechSavvy",
    content: "Excellent build quality.",
    datetime: "2023-09-18T09:20:00",
  },
  {
    id: "4",
    userId: "104",
    nickname: "GadgetGuru",
    content: "Good value for money.",
    datetime: "2023-09-17T14:10:00",
  },
  {
    id: "5",
    userId: "105",
    nickname: "ComputerNerd",
    content: "Very satisfied with my purchase.",
    datetime: "2023-09-16T17:55:00",
  },
];

export default dummyComments;
