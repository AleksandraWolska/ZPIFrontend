import { QueryClient } from "react-query";

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch("http://localhost:5173/todos");
  return res.json();
};

export const todosQuery = {
  queryKey: ["todos"],
  queryFn: fetchTodos,
};

export const loader = (queryClient: QueryClient) => async () => {
  return (
    queryClient.getQueryData(todosQuery.queryKey) ??
    (await queryClient.fetchQuery(todosQuery))
  );
};
