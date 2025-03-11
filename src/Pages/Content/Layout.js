import { Helmet } from "react-helmet-async";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

const Layout = ({ title, children }) => {
    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <Header/>
        
            <main>{children}</main>
        
            <Footer />
        </>
    );
};

export default Layout;
