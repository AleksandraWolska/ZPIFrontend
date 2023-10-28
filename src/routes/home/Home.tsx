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
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <>
            <Link to={`/admin/${i + 1}`}>AdminApp {i + 1}</Link>
            <br />
          </>
        );
      })}
      <br />
      <Link to="/secret">Secret page</Link>
      <br />
      <br />
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <>
            <Link to={`/userapp/${i + 1}`}>Userapp {i + 1}</Link>
            <br />
          </>
        );
      })}
      <br />
    </div>
  );
}

export default Home;
