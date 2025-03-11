// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";

// import Header from '../../Componentes/Header/Header';
// import Footer from '../../Componentes/Footer/Footer';

// import './Layout.css';

// function ProductLayout() {
//     const { category, product, subcategory } = useParams();
//     const [productData, setProductData] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`/assets/JSON/Productos/${category}/Modelos/${product}.json`);
//                 const data = await response.json();

//                 const foundProduct = data.productos.find(p => p.ruta.endsWith(subcategory));

//                 if (foundProduct) {
//                     setProductData(foundProduct);
//                 } else {
//                     setProductData(null);
//                 }
//             } catch (error) {
//                 console.error("Error al cargar el producto:", error);
//                 setProductData(null);
//             }
//         };

//         fetchData();
//     }, [category, product, subcategory]);

//     if (!productData) {
//         return <h2>Producto no encontrado</h2>;
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>{productData.nombre} | Kamas</title>
//             </Helmet>

//             <Header/>

//             <main>
//                 <div className="block-container">
//                     <div className="block-content">
//                         <div className="product-page">
//                             <div className="product-page-img">
//                                 <img src={productData.fotos + "1.jpg"} alt={productData.nombre} width="300" />
//                             </div>

//                             <div className="product-page-resume">
//                                 <p className="product-page-category">{productData.categoria}</p>

//                                 <h1 className="product-page-name">{productData.nombre}</h1>

//                                 <p className="product-page-sku">SKU: {productData.sku}</p>

//                                 <div className="product-page-pryces">
//                                     <p className="product-pryce product-pryce-1">S/.{productData.precioNormal}.00</p>
//                                     <p className="product-pryce product-pryce-2">S/.{productData.precioVenta}.00</p>
//                                 </div>

//                                 <div className="product-page-characteristics">
//                                     <p>Características:</p>
//                                     <ul>
//                                         {Object.values(productData.descripcion).map((desc, index) => (
//                                             <li key={index}>
//                                                 <p>{desc}</p>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>

//                                 <div className="product-page-characteristics">
//                                     <p>Detalles del producto:</p>
//                                     <ul>
//                                         {Object.values(productData.detallesDelProducto).map((detalles, index) => (
//                                             <li key={index}>
//                                                 <p>{detalles}</p>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>

//             <Footer/>
//         </>
//     );
// }

// export default ProductLayout;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './Layout.css';

function ProductLayout() {
    const { category, product, subcategory } = useParams();
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `/assets/json/productos/${category}/modelos/${product}.json`;

                console.log("🔍 Intentando cargar:", url);

                const response = await fetch(url);

                const text = await response.text();
                console.log("📜 Respuesta obtenida:", text.slice(0, 100));

                if (text.startsWith("<!DOCTYPE html>")) {
                    throw new Error("El servidor está devolviendo HTML en lugar de JSON.");
                }

                const data = JSON.parse(text);

                const foundProduct = data.productos.find(p => p.ruta.endsWith(subcategory));

                if (foundProduct) {
                    setProductData(foundProduct);
                } else {
                    setProductData(null);
                }
            } catch (error) {
                console.error("❌ Error al cargar el producto:", error);
                setProductData(null);
            }
        };

        fetchData();
    }, [category, product, subcategory]);

    if (!productData) {
        return <h2>Producto no encontrado</h2>;
    }

    return (
        <>
            <Helmet>
                <title>{productData.nombre} | Kamas</title>
            </Helmet>

            <Header />

            <main>
                <div className="block-container">
                    <div className="block-content">
                        <div className="product-page">
                            <div className="product-page-img">
                                <img 
                                    src={`${productData.fotos}1.jpg`} 
                                    alt={productData.nombre} 
                                    width="300" 
                                    onError={(e) => e.target.src = "/assets/images/default-product.jpg"}
                                />
                            </div>

                            <div className="product-page-resume">
                                <p className="product-page-category">{productData.categoria}</p>

                                <h1 className="product-page-name">{productData.nombre}</h1>

                                <p className="product-page-sku">SKU: {productData.sku}</p>

                                <div className="product-page-pryces">
                                    <p className="product-pryce product-pryce-1">S/.{productData.precioNormal}.00</p>
                                    <p className="product-pryce product-pryce-2">S/.{productData.precioVenta}.00</p>
                                </div>

                                <div className="product-page-characteristics">
                                    <p>Características:</p>
                                    <ul>
                                        {Object.values(productData.descripcion).map((desc, index) => (
                                            <li key={index}>
                                                <p>{desc}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="product-page-characteristics">
                                    <p>Detalles del producto:</p>
                                    <ul>
                                        {Object.values(productData.detallesDelProducto).map((detalles, index) => (
                                            <li key={index}>
                                                <p>{detalles}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default ProductLayout;
