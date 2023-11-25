import { Link } from "react-router-dom";
import useAdminStores from "./useAdminStores";
import { StoreSummary } from "../../../types";

function AdminMainPage() {
  const adminStores = useAdminStores() as StoreSummary[];

  return (
    <div>
      <Link to="new">New store</Link>
      <br />
      <br />

      {adminStores.map((adminStore) => {
        return (
          <div key={adminStore.storeConfigId}>
            <Link to={adminStore.storeConfigId}>{adminStore.name}</Link>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default AdminMainPage;
