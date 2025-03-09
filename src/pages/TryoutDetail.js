import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/TryoutDetail.css";

const TryOutDetail = () => {
  const { id } = useParams();
  const [tryout, setTryout] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:2000/tryouts/${id}`)
      .then((res) => res.json())
      .then((data) => setTryout(data))
      .catch((error) => console.error("Error fetching tryout:", error));
  }, [id]);

  if (!tryout) return <p>Loading...</p>;

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="tryout-detail-page">
      <h2 className="tryout-detail-page">Tryout Detail</h2>
      <div className="tryout-detail-container">
        <div className="tryout-detail-card">
          <h3 className="tryout-detail-title">{tryout.title}</h3>
          <p className="tryout-detail-category">{tryout.category}</p>
          <p className="tryout-detail-status">
            {tryout.submission_status ? "Sudah Dikerjakan" : "Belum Dikerjakan"}
          </p>
          <p className="tryout-detail-date">{formatDate(tryout.created_at)}</p>
          <Link to="/tryouts">
            <button className="tryout-detail-button">START</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TryOutDetail;
