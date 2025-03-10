import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/Questions.css";

const Questions = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:2000/tryouts/${id}/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, [id]);

  return (
    <div className="question-page">
      <h2 className="question-title-container">QUESTIONS LIST</h2>
      <div className="question-container">
        {questions.length === 0 ? (
          <p className="no-questions">No questions available.</p>
        ) : (
          questions.map((question) => (
            <div key={question.id} className="question-card">
              <p className="question-text">{question.question_text}</p>
              <Link to={`/questions/${question.id}`}>
                <button className="question-button">DETAILS</button>
              </Link>
            </div>
          ))
        )}
      </div>
      <button
        className="create-tryout-button"
        onClick={() => navigate(`/questions/${id}/create-question`)}
      >
        ADD QUESTION
      </button>
    </div>
  );
};

export default Questions;
