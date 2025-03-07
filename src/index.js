// import React from 'react';
// import ReactDOM from 'react-dom/client';

// import { HelmetProvider } from "react-helmet-async";

// import './App.css';

// import App from './App';

// ReactDOM.render(
//     <HelmetProvider>
//         <App/>
//     </HelmetProvider>,

//     document.getElementById("root")
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

import React from "react";
import ReactDOM from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);
