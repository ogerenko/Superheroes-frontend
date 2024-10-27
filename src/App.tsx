import { Link } from "react-router-dom";
import "./App.scss";
import { useEffect } from "react";

// const BASE_URL = 'https://superhero-backend-bf70bd1ab235.herokuapp.com/';

export const App = () => {
  useEffect(() => {
    const startTime = Date.now();

    console.log("start fetching all heroes");
    
    fetch("https://superhero-backend-bf70bd1ab235.herokuapp.com/heroes/205")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error))
      .finally(() => console.log("time of fetching all heroes is ", Date.now() - startTime + "ms"));
  }, []);

  return (
    <div className="main-container">
      <Link to="heroes-list" className="start-button">
        Go start!
      </Link>
    </div>
  );
};
