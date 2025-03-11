// import React, { useEffect, useState } from "react";

// import './Header.css';

// import SearchBar from '../SearchBar/SearchBar';

// const Header = () => {
//     const [menuData, setMenuData] = useState(null);
//     const [activeMenu, setActiveMenu] = useState(null);

//     useEffect(() => {
//         fetch("/assets/JSON/Categories.json")
//         .then((response) => response.json())
//         .then((data) => setMenuData(data))
//         .catch((error) => console.error("Error loading menu data:", error));
//     }, []);

//     const handleMenuClick = (id) => {
//         setActiveMenu(prev => (prev === id ? null : id));
//     };

//     if (!menuData) return <p>Cargando menu principal</p>;

//     return(
//         <header>
//             <div className='header-banner-container'>
//                 <div className='header-banner'>
//                     <p>Hacemos envíos a todo el Perú por la agencia de tu preferencia. 🚚</p>
//                 </div>
//             </div>

//             <div className='header-bottom-container'>
//                 <div className='header-bottom'>
//                     <a href="/" className="header-logo">
//                         <img src="https://www.kamas.pe/img/logo-principal-kamas.webp" alt="Kamas"/>
//                     </a>

//                     <nav className="menu-container">
//                         <ul className="menu">
//                             {menuData.Categories.map((item) => (
//                                 <li key={item.id}>
//                                     {item.id === 8 ? (
//                                         <a href={item.route} className={`menu-link menu-link-${item.id}`}>
//                                             <span className="material-icons">{item.icon}</span>
//                                             <h2>{item.category}</h2>
//                                         </a>
//                                     ) : (
//                                         <button type="button" className={`menu-link menu-link-${item.id} ${activeMenu === item.id ? 'active' : ''}`} onClick={() => handleMenuClick(item.id)}>
//                                             <span className="material-icons">{item.icon}</span>
//                                             <h2>{item.category}</h2>
//                                         </button>
//                                     )}
                                    
//                                     {item.subCategories && (
//                                         <div className={`submenu-container submenu-container-${item.id} ${activeMenu === item.id ? 'active' : ''}`}>
//                                             <div className="submenu">
//                                                 <div className="submenu-target submenu-target-1">
//                                                     <p className="submenu-target-title">{item.category}</p>
//                                                     <p className="text">{item.menuMessage?.[0]?.text}</p>
//                                                 </div>

//                                                 <div className="submenu-target submenu-target-2">
//                                                     <p className="submenu-target-title">{item.subCategoriesTitle?.[0]?.text}</p>
//                                                     <ul>
//                                                         {item.subCategories.map((sub) => (
//                                                             <li key={sub.id}>
//                                                                 <a href={sub.route} alt={sub.headTitle} title={sub.headTitle}>
//                                                                     <h3>{sub.subCategory}</h3>
//                                                                 </a>
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//                                                 </div>

//                                                 <div className="submenu-target submenu-target-3">
//                                                     <img src={item.menuImg?.[0]?.imgSrc} alt={item.menuImg?.[0]?.imgAlt} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </li>
//                             ))}
//                         </ul>
//                     </nav>

//                     <SearchBar/>

//                     <button type="button" className="menu-button">
//                         <span className="material-icons">menu</span>
//                         <span className="material-icons">close</span>
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;

import React, { useEffect, useState } from "react";

import './Header.css';

import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
    const [menuData, setMenuData] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetch("/assets/JSON/Categories.json")
        .then((response) => response.json())
        .then((data) => setMenuData(data))
        .catch((error) => console.error("Error loading menu data:", error));
    }, []);

    const handleMenuClick = (id) => {
        setActiveMenu(prev => (prev === id ? null : id));
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    if (!menuData) return <p>Cargando menu principal</p>;

    return(
        <header>
            <div className='header-banner-container'>
                <div className='header-banner'>
                    <p>Hacemos envíos a todo el Perú por la agencia de tu preferencia. 🚚</p>
                </div>
            </div>

            <div className='header-bottom-container'>
                <div className='header-bottom'>
                    <a href="/" className="header-logo">
                        <img src="https://www.kamas.pe/img/logo-principal-kamas.webp" alt="Kamas"/>
                    </a>

                    <nav className={`menu-container ${isMenuOpen ? 'active' : ''}`}>
                        <ul className="menu">
                            {menuData.Categories.map((item) => (
                                <li key={item.id}>
                                    {item.id === 8 ? (
                                        <a href={item.route} className={`menu-link menu-link-${item.id}`}>
                                            <span className="material-icons">{item.icon}</span>
                                            <h2>{item.category}</h2>
                                        </a>
                                    ) : (
                                        <button type="button" className={`menu-link menu-link-${item.id} ${activeMenu === item.id ? 'active' : ''}`} onClick={() => handleMenuClick(item.id)}>
                                            <span className="material-icons">{item.icon}</span>
                                            <h2>{item.category}</h2>
                                        </button>
                                    )}
                                    
                                    {item.subCategories && (
                                        <div className={`submenu-container submenu-container-${item.id} ${activeMenu === item.id ? 'active' : ''}`}>
                                            <div className="submenu">
                                                <div className="submenu-target submenu-target-1">
                                                    <p className="submenu-target-title">{item.category}</p>
                                                    <p className="text">{item.menuMessage?.[0]?.text}</p>
                                                </div>

                                                <div className="submenu-target submenu-target-2">
                                                    <p className="submenu-target-title">{item.subCategoriesTitle?.[0]?.text}</p>
                                                    <ul>
                                                        {item.subCategories.map((sub) => (
                                                            <li key={sub.id}>
                                                                <a href={sub.route} alt={sub.headTitle} title={sub.headTitle}>
                                                                    <h3>{sub.subCategory}</h3>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="submenu-target submenu-target-3">
                                                    <img src={item.menuImg?.[0]?.imgSrc} alt={item.menuImg?.[0]?.imgAlt} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <SearchBar/>

                    <button type="button" className={`menu-button ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span className="material-icons">menu</span>
                        <span className="material-icons">close</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
