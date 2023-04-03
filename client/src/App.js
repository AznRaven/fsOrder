import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { userInfo } from "./services/userService";

import "./index.css";

import EditPost from "./pages/orders/Edit";
import IndexPost from "./pages/orders/Index";
import NewPost from "./pages/orders/New";
import ShowPost from "./pages/orders/Show";
import EditComment from "./pages/comments/Edit";

import Register from "./pages/users/Register";
import Login from "./pages/users/Login";

import Navbar from "./components/Navbar";
import About from "./pages/about";

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      getLoggedInUser();
    } else {
      setIsLoading(false);
    }

    async function getLoggedInUser() {
      const user = await userInfo();
      setUser(user);
      setIsLoading(false);
    }
  }, []);

  let loggedIn = user.username;

  return (
    <div className="App">
      <Navbar user={loggedIn} setUser={setUser} />
      <Routes>
        <Route path="/orders" element={<IndexPost user={loggedIn} />} />
        <Route path="/about" element={<About user={loggedIn} />} />
        <Route path="/orders/:id" element={<ShowPost user={loggedIn} />} />
        {loggedIn ? (
          <>
            <Route path="/orders/new" element={<NewPost user={loggedIn} />} />
            <Route path="/orders/:id/edit" element={<EditPost />} />
            <Route path="/orders/:id/comments/:cid" element={<EditComment />} />
            {!isLoading && (
              <Route path="*" element={<Navigate to="/orders" />} />
            )}
          </>
        ) : (
          <>
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            {!isLoading && (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
