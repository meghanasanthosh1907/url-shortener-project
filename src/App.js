// src/App.js
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

import Home from './pages/Home';
import View from './pages/View';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/home" element={<Home />} />
      <Route path="/view" element={<View />} />
    </Routes>
  );
}

export default App;

