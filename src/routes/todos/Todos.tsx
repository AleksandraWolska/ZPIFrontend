import { Link } from "react-router-dom";
import useTodos from "./useTodos";

function Todos() {
  const todos = useTodos();

  return (
    <div>
      <h1>Todos</h1>
      <ul>{todos.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
}

export default Todos;
