import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar__inner">
                    <Link to="/" className="navbar__logo">
                        <span className="navbar__logo-icon">🏴‍☠️</span>
                        <span className="navbar__logo-text">
                            GRAND<span>LINE</span>MARKET
                        </span>
                    </Link>

                    <nav className="navbar__nav">
                        <NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                            Inicio
                        </NavLink>
                        <NavLink to="/cards" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                            Cartas
                        </NavLink>
                        <NavLink to="/sets" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                            Sets
                        </NavLink>
                        <span className="navbar__link" style={{ opacity: 0.45, cursor: 'not-allowed' }}>
                            Vender
                        </span>
                    </nav>

                    <div className="navbar__actions">
                        <button className="btn btn--outline" style={{ opacity: 0.5, cursor: 'not-allowed', fontSize: '0.82rem' }}>
                            🔍 Buscar
                        </button>
                        <button className="btn btn--primary" style={{ opacity: 0.5, cursor: 'not-allowed', fontSize: '0.82rem' }}>
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
