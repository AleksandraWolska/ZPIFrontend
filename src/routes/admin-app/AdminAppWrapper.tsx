import { Link, Outlet } from "react-router-dom";

function AdminAppWrapper() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h1>Admin App</h1>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="item-list">Item list</Link>
          <Link to="add-item">Add item</Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default AdminAppWrapper;
