import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Tryouts.css";

const Tryout = () => {
  const [tryouts, setTryouts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTryouts();
  }, []);

  const fetchTryouts = async () => {
    let query = new URLSearchParams();
    if (searchTitle) query.append("title", searchTitle);
    if (searchCategory) query.append("category", searchCategory);
    if (searchDate) query.append("date", searchDate);

    try {
      const response = await fetch(
        `http://localhost:2000/tryouts?${query.toString()}`
      );
      const data = await response.json();
      setTryouts(data);
    } catch (error) {
      console.error("Error fetching tryouts:", error);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchTryouts();
  };

  return (
    <div className="tryout-page">
      <h2 className="tryout-title-container">TRYOUT LIST</h2>

      <form className="filter-form" onSubmit={handleFilter}>
        <input
          type="text"
          placeholder="Search Title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button type="submit">Filter</button>
      </form>

      <div className="tryout-container">
        {tryouts.length > 0 ? (
          tryouts.map((tryout) => (
            <div key={tryout.id} className="tryout-card">
              <h3 className="tryout-title">{tryout.title}</h3>
              <Link to={`/tryouts/${tryout.id}`}>
                <button className="tryout-button">DETAILS</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No tryouts found.</p>
        )}
      </div>

      <button
        className="create-tryout-button"
        onClick={() => navigate("/tryouts/create-tryout")}
      >
        CREATE NEW TRYOUT
      </button>
    </div>
  );
};

export default Tryout;
