import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateTryout.css";

const CreateTryout = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTryout = { title, category };

    try {
      const response = await fetch("http://localhost:2000/tryouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTryout),
      });

      if (response.ok) {
        navigate("/tryouts");
      } else {
        console.error("Failed to create tryout");
      }
    } catch (error) {
      console.error("Error submitting tryout:", error);
    }
  };

  return (
    <div className="create-tryout-page">
      <div className="form-container">
        <div className="form-card">
          <div className="title-card">CREATE NEW TRYOUT</div>
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
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTryout;
