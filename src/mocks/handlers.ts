import { rest } from "msw";

const todos = [
  {
    userId: 1,
    id: 1,
    title: "Learn TypeScript",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "Go for a walk",
    completed: false,
  },
  {
    userId: 2,
    id: 3,
    title: "Read a book",
    completed: false,
  },
];

const getAllTodos = rest.get("/api/todos", (_req, res, ctx) => {
  return res(ctx.status(200), ctx.json(todos));
});

export const handlers = [getAllTodos];
