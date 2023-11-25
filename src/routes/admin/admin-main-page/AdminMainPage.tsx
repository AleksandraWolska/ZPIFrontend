import { Link } from "react-router-dom";
import useAdminStores from "./useAdminStores";

function AdminMainPage() {
  const adminStores = useAdminStores();

  return (
    <div>
      <Link to="new">New store</Link>
      <br />
      <br />

      {adminStores.map((adminStore) => {
        return (
          <div key={adminStore.storeConfigId}>
            <Link to={adminStore.name.toLowerCase()}>{adminStore.name}</Link>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default AdminMainPage;
