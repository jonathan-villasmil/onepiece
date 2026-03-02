import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CardDetailPage } from './pages/CardDetailPage';
import { SetsPage } from './pages/SetsPage';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cards" element={<CatalogPage />} />
          <Route path="/cards/:id" element={<CardDetailPage />} />
          <Route path="/sets" element={<SetsPage />} />
          <Route
            path="*"
            element={
              <div className="container">
                <div className="not-found">
                  <div className="not-found__code">404</div>
                  <p className="not-found__title">Página no encontrada</p>
                  <p className="not-found__text">
                    La página que buscas no existe.
                  </p>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
