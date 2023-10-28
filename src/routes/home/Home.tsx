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
      <Link to="/admin/7">AdminApp 7</Link>
      <br />
      <br />
      <Link to="/secret">Secret page</Link>
      <br />
      <Link to="/userapp/1">UserApp 1</Link>
      <br />
      <Link to="/userapp/7">UserApp 7</Link>
    </div>
  );
}

export default Home;
