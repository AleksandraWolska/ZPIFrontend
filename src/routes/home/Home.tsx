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
      <br />
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <Link to={`/userapp/${i + 1}`}>Userapp {i + 1}</Link>
            <br />
          </div>
        );
      })}
      <br />
      <Link to="/userapp/101">Userapp 101 (new store)</Link>
    </div>
  );
}

export default Home;
