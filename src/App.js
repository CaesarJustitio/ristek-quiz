import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Tryouts from "./pages/Tryouts";
import TryoutDetail from "./pages/TryoutDetail";
import CreateTryout from "./pages/CreateTryout";
import UpdateTryout from "./pages/UpdateTryout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/tryouts" element={<Tryouts />} />
            <Route path="/tryouts/:id" element={<TryoutDetail />} />
            <Route path="/tryouts/create-tryout" element={<CreateTryout />} />
            <Route path="/tryouts/update/:id" element={<UpdateTryout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
