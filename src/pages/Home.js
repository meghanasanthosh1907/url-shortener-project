import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUrl } from "../redux/urlSlice";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls.urls);
  const user = useSelector((state) => state.auth.user);
const userUrls = urls.filter((url) => url.userEmail === (user?.email || "guest"));

  const [title, setTitle] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  

  const handleAddUrl = () => {
  if (user && title && originalUrl) {
    const newUrl = {
      id: Date.now(),
      title,
      originalUrl,
      shortUrl: `https://short.ly/${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      userEmail: user.email,  // ✅ This line is critical
    };
    dispatch(addUrl(newUrl));
    setTitle("");
    setOriginalUrl("");
  }
};

  

  return (
    <div className="home-container">
      <Navbar />
      <h1>Welcome User!</h1>

      <div className="add-url-form">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
       <button onClick={handleAddUrl} disabled={userUrls.length >= 5}>
  Add URL
</button>
{userUrls.length >= 5 && (
  <p style={{ color: "red" }}>You have reached the 5 URL limit.</p>
)}

      </div>

      

      <Link to="/view">
        <button className="view-button">Go to View URLs</button>
      </Link>
    </div>
  );
};

export default Home;










