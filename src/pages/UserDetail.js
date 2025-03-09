import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/UserDetail.css";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:2000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-detail-page">
      <h2 className="user-detail-page">USER DETAIL</h2>
      <div className="user-detail-container">
        <div className="user-detail-card">
          <h3 className="user-detail-name">
            {user.first_name} {user.last_name}
          </h3>
          <p className="user-detail-email">{user.email}</p>
          <Link to="/users">
            <button className="user-detail-button">BACK</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
