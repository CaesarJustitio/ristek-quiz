import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Tryouts.css";

const Tryout = () => {
  const [tryouts, setTryouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2000/tryouts")
      .then((res) => res.json())
      .then((data) => setTryouts(data))
      .catch((error) => console.error("Error fetching tryouts:", error));
  }, []);

  return (
    <div className="tryout-page">
      <h2 className="tryout-title-container">TRYOUT LIST</h2>
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
      <button
        className="create-tryout-button"
        onClick={() => navigate("/tryouts/create-tryout")}
      >
        Create New Tryout
      </button>
    </div>
  );
};

export default Tryout;
