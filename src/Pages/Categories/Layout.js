import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './Layout.css';

function Layout() {
    const { category } = useParams(); // Extrae el parámetro de la URL
    const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    const [meta, setMeta] = useState(null);
    const [filtros, setFiltros] = useState([]);
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null); // Nuevo estado para manejar errores

    useEffect(() => {
        if (!category) {
            setError("Error: Falta el parámetro 'category' en la URL.");
            return;
        }

        setError(null); // Resetear error en caso de un nuevo intento

        // Cargar metadatos
        fetch('/assets/JSON/Categories.json')
            .then((res) => res.json())
            .then((data) => {
                const found = data.Categories.find(
                    (item) => item.category.toLowerCase() === category.toLowerCase()
                );
                setMeta(found);
            })
            .catch((err) => {
                console.error("Error al cargar Categories.json:", err);
                setError("No se pudo cargar la categoría.");
            });

        // Cargar filtros
        fetch(`/assets/JSON/Productos/${capitalizedCategory}/Filtros.json`)
            .then((res) => res.json())
            .then((data) => setFiltros(data))
            .catch((err) => {
                console.error("Error al cargar Filtros.json:", err);
                setError("No se pudieron cargar los filtros.");
            });

        // Cargar productos desde múltiples archivos
        Promise.all([
            fetch(`/assets/JSON/Productos/${capitalizedCategory}/Modelos/Adel.json`).then((res) => res.json()),
            fetch(`/assets/JSON/Productos/${capitalizedCategory}/Modelos/Sarki.json`).then((res) => res.json()),
        ])
            .then((data) => {
                const allProducts = data.flatMap(file => file.productos);
                setProductos(allProducts);
            })
            .catch((err) => {
                console.error("Error al cargar productos:", err);
                setError("No se pudieron cargar los productos.");
            });

    }, [category, capitalizedCategory]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
            {meta && (
                <Helmet>
                    <title>{meta.headTitle}</title>
                </Helmet>
            )}

            <Header />

            <main>
                <div className="block-container">
                    <div className="block-content">
                        <section className="category-container">
                            <div className="filters-container">
                                {filtros.map((filtro, index) => (
                                    <div key={`filtro-${index}`} className="filter">
                                        <h3>{filtro.name}</h3>
                                        <ul>
                                            {filtro.list.map((item, i) => (
                                                <li key={`item-${filtro.id}-${i}`}>
                                                    <input type="checkbox"></input>
                                                    <p>{item.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="products">
                                {productos.map((producto, index) => {
                                    const uniqueKey = producto.id 
                                        ? `producto-${producto.id}-${index}`
                                        : `producto-${index}-${new Date().getTime()}`;
                                    return (
                                        <a href={producto.ruta} key={uniqueKey} className="product">
                                            <img src="" alt=""></img>
                                            <h3>{producto.nombre}</h3>
                                            <p>Precio: S/.{producto.precio}</p>
                                        </a>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Layout;
