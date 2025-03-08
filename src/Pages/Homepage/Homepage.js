import './Homepage.css';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

function Homepage(){
    return(
        <>
            <Header/>

            <main>
                <div className='homepage-hero-container'>
                    <section className='homepage-hero'>
                        <div className='homepage-hero-slider-container'>
                            <ul className='homepage-hero-slider'>
                                <li>
                                    <img src="/assets/images/homepage/slider/1.jpg" alt=""/>
                                </li>
                                <li>
                                    <img src="/assets/images/homepage/slider/2.jpg" alt=""/>
                                </li>
                                <li>
                                    <img src="/assets/images/homepage/slider/3.jpg" alt=""/>
                                </li>
                            </ul>
                        </div>

                        <button type="button" className='homepage-hero-slider-button homepage-hero-slider-button-left'>
                            <span className="material-icons">chevron_left</span>
                        </button>

                        <button type="button" className='homepage-hero-slider-button homepage-hero-slider-button-right'>
                            <span className="material-icons">chevron_right</span>
                        </button>
                    </section>
                </div>

                <div className='block-container block-container-beneficts'>
                    <section className='block-content'>
                        <div className='homepage-beneficts'>
                            <div className='homepage-benefict'>
                                <img src="https://forliperu.vtexassets.com/assets/vtex/assets-builder/forliperu.forliperutheme/6.3.3/img/5___18d08964d4b602eb5f3d7dbf9f81fa31.png" alt=""/>
                                <p className='text'>Envios rápidos y seguros</p>
                            </div>
                            <div className='homepage-benefict'>
                                <img src="https://forliperu.vtexassets.com/assets/vtex/assets-builder/forliperu.forliperutheme/6.3.3/img/5___18d08964d4b602eb5f3d7dbf9f81fa31.png" alt=""/>
                                <p className='text'>Envios rápidos y seguros</p>
                            </div>
                            <div className='homepage-benefict'>
                                <img src="https://forliperu.vtexassets.com/assets/vtex/assets-builder/forliperu.forliperutheme/6.3.3/img/5___18d08964d4b602eb5f3d7dbf9f81fa31.png" alt=""/>
                                <p className='text'>Envios rápidos y seguros</p>
                            </div>
                            <div className='homepage-benefict'>
                                <img src="https://forliperu.vtexassets.com/assets/vtex/assets-builder/forliperu.forliperutheme/6.3.3/img/5___18d08964d4b602eb5f3d7dbf9f81fa31.png" alt=""/>
                                <p className='text'>Envios rápidos y seguros</p>
                            </div>
                        </div>
                    </section>
                </div>
                <a href="/productos/colchones/" title="">Colchones</a>
                <br/>
                <a href="/pagina-de-contenido-1" title="">Página de contenido 1</a>
            </main>

            <Footer/>
        </>
    );
}

export default Homepage;
