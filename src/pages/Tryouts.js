import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Tryouts.css";

const Tryout = () => {
  const [tryouts, setTryOut] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/tryouts")
      .then((res) => res.json())
      .then((data) => setTryOut(data))
      .catch((error) => console.error("Error fetching tryout:", error));
  }, []);

  return (
    <div className="tryout-page">
      <h2 className="tryout-title-container">Tryout List</h2>
      <div className="tryout-container">
        {tryouts.map((tryout) => (
          <div key={tryout.id} className="tryout-card">
            <h3 className="tryout-title">{tryout.title}</h3>
            <Link to={`/tryouts/${tryout.id}`}>
              <button className="tryout-button">DETAILS</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tryout;
