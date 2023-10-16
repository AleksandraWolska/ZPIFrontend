import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <br />
      <Link to="/ZPIFrontend/store-config-wizard">Store config wizard</Link>
      <br />
      <br />
      <Link to="/ZPIFrontend/admin/1">AdminApp 1</Link>
      <br />
      <Link to="/ZPIFrontend/admin/2">AdminApp 2</Link>
      <br />
      <Link to="/ZPIFrontend/admin/3">AdminApp 3</Link>
      <br />
      <br />
      <Link to="/ZPIFrontend/todos">Todos</Link>
      <br />
      <Link to="/ZPIFrontend/secret">Secret page</Link>
      <br />
      <Link to="/ZPIFrontend/userapp/1">UserApp</Link>
    </div>
  );
}

export default Home;
