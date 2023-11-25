import { Outlet } from "react-router-dom";
import AdminAppTopBar from "./AdminAppTopBar";

function AdminAppWrapper() {
  return (
    <>
      <AdminAppTopBar />
      <Outlet />
    </>
  );
}

export default AdminAppWrapper;
