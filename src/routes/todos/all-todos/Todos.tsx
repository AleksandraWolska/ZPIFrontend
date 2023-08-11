import useTodos from "./useTodos";

function Todos() {
  const todos = useTodos();

  return (
    <ul>{todos.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
  );
}

export default Todos;
