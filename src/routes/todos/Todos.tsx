import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTodos from "./useTodos";

function Todos() {
  const { t } = useTranslation();

  const todos = useTodos();

  return (
    <div>
      <h1>{t("todos.title")}</h1>
      <ul>{todos.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
}

export default Todos;
