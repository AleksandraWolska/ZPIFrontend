import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

function AdminAppWrapper() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}

export default AdminAppWrapper;
