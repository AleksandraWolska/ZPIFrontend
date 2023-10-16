import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

function TodosLayout() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("todos.title")}</h1>

      <Outlet />

      <br />
      <Link to="all">All</Link>
      <br />
      <Link to="/ZPIFrontend">Home</Link>
    </div>
  );
}

export default TodosLayout;
