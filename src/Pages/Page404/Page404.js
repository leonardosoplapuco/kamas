import { Link } from "react-router-dom";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

import './Page404.css';

const Page404 = () => {
    return(
        <>
            <Header/>

            <main>
                <h1>404 - Página no encontrada</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
                <Link to="/">Volver al inicio</Link>
            </main>

            <Footer/>
        </>
    );
};

export default Page404;
