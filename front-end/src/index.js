import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';



// index. css (Dark mode)
import './index.css';

// Router Project

import RouterProject from './RouterProject';

//Dil için
import './internationalization/i18nlanguage'

// Importing the Bootstrap CSS


// Browser Router
// BrowserRouter: http://localhost:3000
// HashRouter: http://localhost:3000/#/
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterProject />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
