export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div>
                        <div className="footer__brand-name">
                            GRAND<span>LINE</span>MARKET
                        </div>
                        <p className="footer__desc">
                            El marketplace de referencia para las cartas del juego de cartas oficial de One Piece TCG.
                            Compra, vende y gestiona tu colección fácilmente.
                        </p>
                    </div>
                    <div>
                        <p className="footer__col-title">Explorar</p>
                        <ul className="footer__links">
                            <li><a href="/cards">Catálogo de Cartas</a></li>
                            <li><a href="/cards?set=OP-01">Romance Dawn</a></li>
                            <li><a href="/cards?set=OP-08">Two Legends</a></li>
                            <li><a href="/cards?rarity=Secret+Rare">Secret Rares</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="footer__col-title">Próximamente</p>
                        <ul className="footer__links">
                            <li><a href="#">Vender Cartas</a></li>
                            <li><a href="#">Mi Colección</a></li>
                            <li><a href="#">Lista de Deseos</a></li>
                            <li><a href="#">Tendencias de Precio</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer__bottom">
                    <p className="footer__copy">© 2026 GrandLineMarket. Todos los derechos reservados.</p>
                    <p className="footer__disclaimer">
                        Este sitio no está afiliado con Bandai ni con Toei Animation.
                        One Piece es marca registrada de su respectivo propietario.
                    </p>
                </div>
            </div>
        </footer>
    );
}
