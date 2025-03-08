import { Helmet } from "react-helmet-async";

function Page1(){
    return(
        <>
            <Helmet>
                <title>Página de contenido 12</title>
            </Helmet>

            <h1>Página de contenido 1 como </h1>

            <a href="/">Regresar al inicio</a>
        </>
    );
}

export default Page1;
