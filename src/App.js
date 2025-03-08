import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from './Pages/Homepage/Homepage';

import Layout from "./Pages/Content/Layout";
import Page1 from './Pages/Content/Page-1/Page';

import './App.css';

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Homepage/>}/>

                <Route path="/pagina-de-contenido-1" element={<Layout title="Página de contenido N°1"><Page1/></Layout>}/>
            </Routes>
        </Router>
    );
}

export default App;
