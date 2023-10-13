import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <br />
      <Link to="/store-config-wizard">Store config wizard</Link>
      <br />
      <br />
      <Link to="/admin/1">AdminApp 1</Link>
      <br />
      <Link to="/admin/2">AdminApp 2</Link>
      <br />
      <Link to="/admin/3">AdminApp 3</Link>
      <br />
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
