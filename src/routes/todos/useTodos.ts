import { useQuery } from "react-query";
import { todosQuery } from "./loader";

function useTodos() {
  return useQuery(todosQuery);
}

export default useTodos;
