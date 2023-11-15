import { Link } from "react-router-dom";
import useAdminStores from "./useAdminStores";

function AdminMenu() {
  const adminStores = useAdminStores();
  console.log(adminStores);

  return (
    <div>
      <Link to="new">New store</Link>
      <br />
      <br />

      {adminStores.map((adminStore) => {
        return (
          <>
            <Link key={adminStore.storeConfigId} to={adminStore.storeConfigId}>
              {adminStore.name}
            </Link>
            <br />
          </>
        );
      })}
    </div>
  );
}

export default AdminMenu;
