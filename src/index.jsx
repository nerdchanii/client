import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NaverCallback from './components/Layout/Topper/NaverCallback';

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <React.StrictMode>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/callback/*" element={<NaverCallback />} />
        </Routes>
      </React.StrictMode>
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
