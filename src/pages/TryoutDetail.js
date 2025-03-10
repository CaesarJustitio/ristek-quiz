import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/TryoutDetail.css";


const TryOutDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tryout, setTryout] = useState(null);
  
    useEffect(() => {
      const fetchTryoutData = async () => {
        try {
          const [tryoutRes] = await Promise.all([
            fetch(`http://localhost:2000/tryouts/${id}`).then((res) => res.json()),
            fetch(`http://localhost:2000/tryouts/${id}/questions`).then((res) => res.json()),
          ]);
  
          setTryout(tryoutRes);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchTryoutData();
    }, [id]);
  
    if (!tryout) return <p>Loading...</p>;

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus tryout ini?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:2000/tryouts/${tryout.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Tryout berhasil dihapus!");
        navigate("/tryouts");
      } else {
        alert("Gagal menghapus tryout");
      }
    } catch (error) {
      console.error("Error deleting tryout:", error);
      alert("Terjadi kesalahan saat menghapus tryout.");
    }
  };

  return (
    <div className="tryout-detail-page">
      <h2 className="tryout-detail-page">TRYOUT DETAIL</h2>
      <div className="tryout-detail-container">
        <div className="tryout-detail-card">
          <h3 className="tryout-detail-title">{tryout.title}</h3>
          <p className="tryout-detail-category">{tryout.category}</p>
          <p className="tryout-detail-status">
            {tryout.submission_status ? "Sudah Dikerjakan" : "Belum Dikerjakan"}
          </p>
          <p className="tryout-detail-date">{formatDate(tryout.created_at)}</p>

          <div className="tryout-detail-buttons">
            <Link to={`/tryouts/delete/${tryout.id}`}>
              <button
                className="delete-tryout-button"
                onClick={handleDelete}
              >
                DELETE
              </button>
            </Link>
            <Link to={`/tryouts/update/${tryout.id}`}>
              <button className="update-tryout-button">UPDATE</button>
            </Link>

            <Link to={`/tryouts/${tryout.id}/questions`}>
              <button className="view-tryout-button">VIEW</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOutDetail;
