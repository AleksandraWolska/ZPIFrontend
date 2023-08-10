import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Hello World!</h1>
      <br />
      <Link to="/todos">Todos</Link>
    </div>
  );
}

export default Home;
