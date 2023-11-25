import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <br />
      <Link to="/admin">AdminApp</Link>
      <br />
      <br />
      <Link to="/secret">Secret page</Link>
      <br />
    </div>
  );
}

export default Home;
