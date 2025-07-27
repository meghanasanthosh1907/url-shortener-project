// src/index.js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // <-- import this
import App from './App';
import store from './redux/store'; // <-- adjust the path if your store is in a different folder

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>      {/* ✅ Add this */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);



