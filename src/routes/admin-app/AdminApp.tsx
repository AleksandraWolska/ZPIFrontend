import { Link } from "react-router-dom";

function AdminApp() {
  return (
    <>
      <Link to="item-list">Item list</Link>
      <br />
      <Link to="new-item">New item</Link>
    </>
  );
}

export default AdminApp;
