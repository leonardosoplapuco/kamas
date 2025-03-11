import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Rutas principales
import Homepage from './Pages/Homepage/Homepage';

// Página de las categorías
import Layout from "./Pages/Categories/Layout";

// Página del producto
import ProductLayout from "./Pages/Product/Layout";

// Manejo de errores
import Page404 from './Pages/Page404/Page404';

import './App.css';

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                
                <Route path="/productos/:category/" element={<Layout/>}/>

                <Route path="/productos/:category/:product/:subcategory" element={<ProductLayout/>}/>

                <Route path="*" element={<Page404/>}/>
            </Routes>
        </Router>
    );
}

export default App;
