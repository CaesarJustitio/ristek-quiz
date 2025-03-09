import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTryout = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTryout = async () => {
      try {
        const response = await fetch(`http://localhost:2000/tryouts/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data);

          if (data.title) setTitle(data.title);
          if (data.category) setCategory(data.category);
        } else {
          console.error("Failed to fetch tryout data");
        }
      } catch (error) {
        console.error("Error fetching tryout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTryout();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTryout = { title, category };

    try {
      const response = await fetch(`http://localhost:2000/tryouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTryout),
      });

      if (response.ok) {
        navigate("/tryouts");
      } else {
        console.error("Failed to update tryout");
      }
    } catch (error) {
      console.error("Error submitting tryout:", error);
    }
  };

  return (
    <div className="update-tryout-page">
      <div className="form-container">
        <div className="form-card">
          <div className="title-card">Update Tryout</div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Category
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </label>
              <button className="form-button" type="submit">
                UPDATE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateTryout;
