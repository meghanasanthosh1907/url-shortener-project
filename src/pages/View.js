import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUrl, updateUrl } from "../redux/urlSlice";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import "./View.css";

const View = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls.urls);
  const user = useSelector((state) => state.auth.user);

  // Only URLs belonging to the logged-in user
  const userUrls = urls.filter((url) => url.userEmail === (user?.email || "guest"));

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editOriginalUrl, setEditOriginalUrl] = useState("");

  const urlsPerPage = 3;

  // ✅ Filter only the current user's URLs
  const filteredUrls = userUrls.filter((url) =>
    url.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reset pagination on search
  }, [searchTerm]);

  const handleDelete = (id) => {
    dispatch(deleteUrl(id));
  };

  const handleEdit = (url) => {
    setEditId(url.id);
    setEditTitle(url.title);
    setEditOriginalUrl(url.originalUrl);
  };

  const handleUpdate = () => {
    const updatedUrl = {
      id: editId,
      title: editTitle,
      originalUrl: editOriginalUrl,
      shortUrl: `https://short.ly/${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      userEmail: user?.email || "guest", // ✅ Keep userEmail during update
    };
    dispatch(updateUrl(updatedUrl));
    setEditId(null);
    setEditTitle("");
    setEditOriginalUrl("");
  };

  return (
    <div className="view-container">
      <Navbar />
      <h2>Saved URLs</h2>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ul className="url-list">
        {currentUrls.map((url) =>
          editId === url.id ? (
            <li key={url.id} className="url-item">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="text"
                value={editOriginalUrl}
                onChange={(e) => setEditOriginalUrl(e.target.value)}
              />
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </li>
          ) : (
            <li key={url.id} className="url-item">
              <div>
                <strong>{url.title}</strong><br />
                Original: <a href={url.originalUrl} target="_blank" rel="noreferrer">{url.originalUrl}</a><br />
                Shortened: <a href={url.shortUrl} target="_blank" rel="noreferrer">{url.shortUrl}</a><br />
                <small>{new Date(url.timestamp).toLocaleString()}</small>
              </div>
              <div className="btn-group">
                <button onClick={() => handleEdit(url)}>Edit</button>
                <button onClick={() => handleDelete(url.id)}>Delete</button>
              </div>
            </li>
          )
        )}
      </ul>

      {filteredUrls.length > urlsPerPage && (
        <Pagination
          urlsPerPage={urlsPerPage}
          totalUrls={filteredUrls.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default View;
