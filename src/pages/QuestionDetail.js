import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/QuestionDetail.css";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(`http://localhost:2000/questions/${id}`);
        if (!response.ok) throw new Error("Question not found");
        const questionData = await response.json();
        console.log("Data pertanyaan diterima:", questionData);
        setQuestion(questionData);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestionData();
  }, [id]);

  if (!question) return <p>Loading...</p>;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus pertanyaan ini?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:2000/questions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Pertanyaan berhasil dihapus!");
        navigate(-1);
      } else {
        alert("Gagal menghapus pertanyaan");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Terjadi kesalahan saat menghapus pertanyaan.");
    }
  };

  return (
    <div className="question-detail-page">
      <h2 className="question-detail-title">QUESTION DETAIL</h2>
      <div className="question-detail-container">
        <div className="question-detail-card">
          <p className="question-text">{question.question_text}</p>
          <p
            className={`question-answer ${question.answer ? "true" : "false"}`}
          >
            {question.answer ? "True" : "False"}
          </p>

          <div className="question-detail-buttons">
            <button
              className="question-detail-button delete"
              onClick={handleDelete}
            >
              DELETE
            </button>
            <Link to={`/questions/update/${id}`}>
              <button className="question-detail-button update">UPDATE</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
