import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './Layout.css';

function Layout() {
    const { category } = useParams();
    const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    const [meta, setMeta] = useState(null);
    const [filtros, setFiltros] = useState([]);
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!category) {
            setError("Error: Falta el parámetro 'category' en la URL.");
            return;
        }

        setError(null);

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

        fetch(`/assets/JSON/Productos/${capitalizedCategory}/Filtros.json`)
            .then((res) => res.json())
            .then((data) => setFiltros(data))
            .catch((err) => {
                console.error("Error al cargar Filtros.json:", err);
                setError("No se pudieron cargar los filtros.");
            });

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
                                <p>Filtrar por:</p>
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

                                    const precioNormal = producto.precioNormal || 0;
                                    const precioVenta = producto.precioVenta || 0;

                                    const descuento = (precioNormal > 0 && precioVenta > 0)
                                    ? Math.round(((precioNormal - precioVenta) * 100) / precioNormal)
                                    : 0;

                                    return(
                                        <a href={producto.ruta} key={uniqueKey} className="product">
                                            <div className='product-images'>
                                                <img src={`${producto.fotos}1.jpg`} alt={producto.nombre} className='product-image product-image-1'/>
                                                <img src={`${producto.fotos}2.jpg`} alt={producto.nombre} className='product-image product-image-2'/>
                                                <span className='product-label-discount'>-{descuento}%</span>
                                            </div>
                                            <div className='product-description'>
                                                <p className='product-brand'>KAMAS</p>
                                                <p className='product-name'>{producto.nombre}</p>
                                                <div className='product-pryces'>
                                                    <p className='product-pryce-1'>S/.{precioNormal}</p>
                                                    <p className='product-pryce-2'>S/.{precioVenta}</p>
                                                </div>
                                            </div>
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
