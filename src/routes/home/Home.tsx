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
      <Link to="/stores/1/items/new">New item 1 (fixed)</Link>
      <br />
      <Link to="/stores/2/items/new">New item 2 (shortSlots)</Link>
      <br />
      <Link to="/stores/3/items/new">New item 3 (multiDay)</Link>
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
