import React, { useEffect, useState } from "react";

import './Header.css';

import SearchBar from '../SearchBar/SearchBar';

const Header = () => {

    const [menuData, setMenuData] = useState(null);

    useEffect(() => {
        fetch("/JSON/Header.json")
        .then((response) => response.json())
        .then((data) => setMenuData(data))
        .catch((error) => console.error("Error loading menu data:", error));
    }, []);

    if (!menuData) return <p>Loading menu...</p>;

    return(
        <header>
            <div className='header-banner-container'>
                <div className='header-banner'>
                    <p>Hacemos envíos a todo el Perú por la agencia de tu preferencia. 🚚</p>
                    {/* <a href="/"><p>Click aquí</p></a> */}
                </div>
            </div>

            <div className='header-bottom-container'>
                <div className='header-bottom'>
                    <img src="https://www.kamas.pe/img/logo-principal-kamas.webp" alt=""/>

                    <nav className="menu-container">
                        <ul className="menu">
                            {menuData.MenuLinks.map((item) => (
                                <li key={item.id}>
                                    {/* <a href={item.href} className={`menu-link menu-link-${item.id}`}>
                                        <span className="material-icons">{item.icon}</span>
                                        <h2>{item.category}</h2>
                                    </a> */}

                                    <button type="button" className={`menu-link menu-link-${item.id}`}>
                                        <span className="material-icons">{item.icon}</span>
                                        <h2>{item.category}</h2>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <SearchBar/>
                </div>
            </div>
        </header>
    );
}

export default Header;
