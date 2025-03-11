import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './Layout.css';

function Layout(){
    const { category } = useParams();
    const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    const [meta, setMeta] = useState(null);
    const [filtros, setFiltros] = useState([]);
    const [productos, setproductos] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!category){
                setError("Error: Falta el parámetro 'category' en la URL.");
            return;
        }

        setError(null);

        fetch('/assets/json/categories.json')
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

        fetch(`/assets/json/productos/${capitalizedCategory}/Filtros.json`)
            .then((res) => res.json())
            .then((data) => setFiltros(data))
            .catch((err) => {
                console.error("Error al cargar Filtros.json:", err);
                setError("No se pudieron cargar los filtros.");
            });

        Promise.all([
            fetch(`/assets/json/productos/${capitalizedCategory}/modelos/adel.json`).then((res) => res.json()),
            fetch(`/assets/json/productos/${capitalizedCategory}/modelos/rucay.json`).then((res) => res.json()),
            fetch(`/assets/json/productos/${capitalizedCategory}/modelos/sarki.json`).then((res) => res.json()),
        ])
            .then((data) => {
                const allProducts = data.flatMap(file => file.productos);
                setproductos(allProducts);
            })
            .catch((err) => {
                console.error("Error al cargar productos:", err);
                setError("No se pudieron cargar los productos.");
            });

    }, [category, capitalizedCategory]);

    const handleFilterChange = (category, value) => {
        setSelectedFilters((prev) => {
            const newFilters = { ...prev };

            if (!newFilters[category]) {
                newFilters[category] = [];
            }

            if (newFilters[category].includes(value)) {
                newFilters[category] = newFilters[category].filter((item) => item !== value);
            } else {
                newFilters[category].push(value);
            }

            return newFilters;
        });
    };

    const filteredProducts = productos.filter((producto) => {
        return Object.entries(selectedFilters).every(([category, values]) => {
            if (values.length === 0) return true;

            if (category === "Tamaño") return values.includes(producto.detallesDelProducto?.tamaño);
            if (category === "Línea de colchones") return values.includes(producto.detallesDelProducto?.lineaColchones);
            if (category === "Nivel de confort") return values.includes(producto.detallesDelProducto?.nivelDeConfort);
            if (category === "Tipo de resorte") return values.includes(producto.detallesDelProducto?.tipoDeResorte);

            return true;
        });
    });

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

                            <div className='leo'>
                                <p>Ruta de la categoría</p>
                            </div>

                            <div className="filters-container">
                                <p>Filtrar por:</p>
                                {filtros.map((filtro, index) => (
                                    <div key={`filtro-${index}`} className="filter">
                                        <h3>{filtro.name}</h3>
                                        <ul>
                                            {filtro.list.map((item, i) => (
                                                <li key={`item-${filtro.id}-${i}`}>
                                                    <input type="checkbox" checked={selectedFilters[filtro.name]?.includes(item.name) || false} onChange={() => handleFilterChange(filtro.name, item.name)}/>
                                                    <p>{item.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="products">
                                {filteredProducts.map((producto, index) => {
                                    const uniqueKey = producto.id
                                        ? `producto-${producto.id}-${index}`
                                        : `producto-${index}-${new Date().getTime()}`;

                                    const precioNormal = producto.precioNormal || 0;
                                    const precioVenta = producto.precioVenta || 0;

                                    const descuento = (precioNormal > 0 && precioVenta > 0)
                                        ? Math.round(((precioNormal - precioVenta) * 100) / precioNormal)
                                        : 0;

                                    return (
                                        <a href={producto.ruta} key={uniqueKey} className="product">
                                            <div className='product-images'>
                                                <img src={`${producto.fotos}1.jpg`} alt={producto.nombre} className='product-image product-image-1' />
                                                <img src={`${producto.fotos}2.jpg`} alt={producto.nombre} className='product-image product-image-2' />
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
