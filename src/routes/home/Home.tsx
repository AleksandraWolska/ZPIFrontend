import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <br />
      <Link to="/schemas/new">New offer schema</Link>
      <br />
      <Link to="/todos">Todos</Link>
      <br />
      <Link to="/secret">Secret page</Link>
      <br />
      <Link to="/userapp/1">UserApp</Link>
    </div>
  );
}

export default Home;
