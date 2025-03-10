import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateQuestion = () => {
  const { id } = useParams();
  const [question_text, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:2000/questions/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data);

          if (data.question_text) setQuestionText(data.question_text);
          if (data.answer !== undefined)
            setAnswer(data.answer ? "true" : "false");
        } else {
          console.error("Failed to fetch question data");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedQuestion = { question_text, answer: answer === "true" };

    try {
      const response = await fetch(`http://localhost:2000/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestion),
      });

      if (response.ok) {
        navigate(-1);
      } else {
        console.error("Failed to update question");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <div className="update-question-page">
      <div className="form-container">
        <div className="form-card">
          <div className="title-card">Update Question</div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Text
                <input
                  type="text"
                  value={question_text}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                />
              </label>
              <label>
                Answer
                <select
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
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

export default UpdateQuestion;
