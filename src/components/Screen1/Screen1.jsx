import { Link } from "react-router-dom";
import "./Screen1.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Link to={"/screen2"} className="btn-start">
        Start
      </Link>
    </div>
  );
};

export default Home;
