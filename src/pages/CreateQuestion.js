import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CreateQuestion.css";

const CreateQuestion = () => {
  const { tryout_id } = useParams();
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Tryout ID from URL:", tryout_id);
  }, [tryout_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tryout_id) {
      setError("Tryout ID is missing. Please ensure the URL is correct.");
      return;
    }

    const payload = {
      tryout_id: parseInt(tryout_id, 10),
      question_text: questionText,
      answer,
    };

    console.log("Sending data:", payload);

    try {
      const response = await fetch("http://localhost:2000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create question");
      }

      alert("Question successfully created!");
      navigate(-1);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="title-card">CREATE QUESTION</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Question Text:
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </label>
          <label>
            Answer:
            <select
              value={answer}
              onChange={(e) => setAnswer(e.target.value === "true")}
              required
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
          <button type="submit" className="form-button">
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
