import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

const Layout = () => {
    const { category } = useParams(); // Extrae la categoría desde la URL
    const [headTitle, setHeadTitle] = useState("");
    const [categories, setCategories] = useState([]); // ✅ Agregado
    const [filters, setFilters] = useState([]);
    const [products, setProducts] = useState([]);

    // Cargar metadatos desde Categories.json
    useEffect(() => {
        fetch("/assets/JSON/Productos/Categories.json")
            .then((res) => res.json())
            .then((data) => setCategories(data.Categories))
            .catch((error) => console.error("Error cargando metadatos:", error));
    }, []);

    // Cargar filtros de la categoría seleccionada
    useEffect(() => {
        if (!category) return;
        
        fetch(`/assets/JSON/Productos/${category}/Filtros.json`)
            .then((res) => res.json())
            .then((data) => setFilters(data))
            .catch((error) => console.error("Error cargando filtros:", error));
    }, [category]);

    // Cargar productos de la categoría seleccionada
    useEffect(() => {
        if (!category) return;

        const modelPaths = [
            `/assets/JSON/Productos/${category}/Modelos/Adel.json`,
            `/assets/JSON/Productos/${category}/Modelos/Sarki.json`
        ];

        Promise.all(modelPaths.map(path => fetch(path).then(res => res.json())))
            .then(models => {
                const allProducts = models.flatMap(model => model.productos);
                setProducts(allProducts);
            })
            .catch(error => console.error("Error cargando productos:", error));
    }, [category]);

    return (
        <>
            <Header />
            <main>
                <h1>{headTitle}</h1>

                {/* Filtros */}
                <div className="filters">
                    <h2>Filtros</h2>
                    {filters.map((filter) => (
                        <div key={filter.id} className="filter-group">
                            <h3>{filter.name}</h3>
                            <ul>
                                {filter.list.map((option) => (
                                    <li key={option.id}>
                                        <input type="checkbox" id={`filter-${filter.id}-${option.id}`} />
                                        <label htmlFor={`filter-${filter.id}-${option.id}`}>{option.name}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Productos */}
                <div className="products">
                    <h2>Productos</h2>
                    {products.map((product, index) => (
                        <div key={index}>
                            <h3>{product.nombre}</h3>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
