import { Link } from "react-router-dom";
import "./App.scss";

export const App = () => {
  return (
    <div className="main-container">
      <Link to="heroes-list" className="start-button">
        Go start!
      </Link>
    </div>
  );
};
