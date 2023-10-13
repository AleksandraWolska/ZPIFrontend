import { Outlet } from "react-router-dom";

function AdminAppWrapper() {
  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>Admin App</h1>

      <Outlet />
    </>
  );
}

export default AdminAppWrapper;
