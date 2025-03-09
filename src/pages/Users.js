import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data Type:", typeof data);
        console.log("Fetched Data:", data);
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="user-page">
      <h2 className="user-title-container">Users List</h2>
      <div className="user-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3 className="user-title">
              {user.first_name} {user.last_name}
            </h3>
            <Link to={`/users/${user.id}`}>
              <button className="user-button">DETAILS</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
