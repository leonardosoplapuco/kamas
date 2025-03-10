// src/Pages/Categories/Layout.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';        
import { Helmet } from 'react-helmet';
import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';
import './Layout.css';

function Layout() {
  const { category } = useParams();
  const [meta, setMeta] = useState(null);
  const [filtros, setFiltros] = useState([]);
  const [productos, setProductos] = useState([]);

  // Helper para capitalizar la categoría
  const capitalizar = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    // Cargar metadata desde /public/JSON/Categories.json
    fetch('/JSON/Categories.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.Categories.find(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        setMeta(found);
      })
      .catch((err) => console.error("Error al cargar Categories.json:", err));

    // Cargar filtros
    fetch(`/JSON/Productos/${capitalizar(category)}/Filtros.json`)
      .then((res) => res.json())
      .then((data) => setFiltros(data))
      .catch((err) => console.error("Error al cargar Filtros.json:", err));

    // Cargar productos (ejemplo usando 2 archivos)
    Promise.all([
      fetch(`/JSON/Productos/${capitalizar(category)}/Modelos/Adel.json`).then((res) => res.json()),
      fetch(`/JSON/Productos/${capitalizar(category)}/Modelos/Sarki.json`).then((res) => res.json()),
      // Agrega más archivos según lo necesites
    ])
      .then((data) => {
        // data es un array de objetos, cada uno con una clave "productos"
        // Usamos flatMap para combinar todos los arrays de productos en uno solo
        const allProducts = data.flatMap(file => file.productos);
        setProductos(allProducts);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, [category]);

  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.headTitle}</title>
        </Helmet>
      )}

      <Header />

      <main>
        <div className="filters-container">
          {filtros.map((filtro) => (
            <div key={filtro.id} className="filtro">
              <h4>{filtro.name}</h4>
              <ul>
                {filtro.list.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="products">
          {productos.map((producto) => (
            <div key={producto.id} className="product">
              <h3>{producto.nombre}</h3>
              {/* Aquí puedes renderizar otros detalles del producto, por ejemplo: */}
              <p>Precio: ${producto.precio}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Layout;
