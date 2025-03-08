import './SearchBar.css';

function SearchBar(){
    return(
        <form className='search-bar-container'>
            <input type="text"></input>
            <div>
                <p>Buscar en kamas.pe</p>
                <span className="material-icons">search</span>
            </div>
        </form>
    );
}

export default SearchBar;
