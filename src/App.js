import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from './Pages/Homepage/Homepage';

// import Layout from "./Pages/Content/Layout";
// import Page1 from './Pages/Content/Page-1/Page';

import Layout from "./Pages/Products/Layout";

import Page404 from './Pages/Page404/Page404';

//Ruta provicional
// import Layout from "./Pages/Products/Layout";

import './App.css';

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Homepage/>}/>

                {/* <Route path="/pagina-de-contenido-1" element={<Layout title="Página de contenido N°1"><Page1/></Layout>}/> */}

                <Route path="/productos/:category/" element={<Layout />} />

                <Route path="*" element={<Page404/>}/>

                {/* <Route path="/productos/colchones" element={<Layout/>}/> */}
            </Routes>
        </Router>
    );
}

export default App;
