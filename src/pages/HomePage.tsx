import { Link } from 'react-router-dom';
import { ALL_SETS } from '../types/card';
import { MOCK_CARDS } from '../data/cards';

export function HomePage() {
    const featured = MOCK_CARDS.filter((c) =>
        ['OP01-120', 'OP01-121', 'OP02-099', 'OP02-013', 'OP04-001', 'OP08-001'].includes(c.id)
    );

    return (
        <div>
            {/* ── HERO ── */}
            <section className="hero">
                <div className="container">
                    <div className="hero__bg-text">ONE PIECE</div>
                    <div className="hero__content">
                        <p className="hero__overline">
                            <span className="hero__overline-dot" />
                            El Marketplace Pirata
                        </p>
                        <h1 className="hero__title">
                            Compra y vende<br />
                            cartas de<br />
                            <span>One Piece TCG</span>
                        </h1>
                        <p className="hero__desc">
                            La plataforma de referencia para coleccionistas y jugadores del juego
                            de cartas de One Piece. Encuentra tu Secret Rare, completa tu colección
                            y vende tus duplicados.
                        </p>
                        <div className="hero__actions">
                            <Link to="/cards" className="btn btn--primary" style={{ fontSize: '1rem', padding: '13px 28px' }}>
                                🃏 Ver Cartas
                            </Link>
                            <Link to="/cards?rarity=Secret+Rare" className="btn btn--outline" style={{ fontSize: '1rem', padding: '13px 28px' }}>
                                ⭐ Secret Rares
                            </Link>
                        </div>
                        <div className="hero__stats">
                            <div>
                                <div className="hero__stat-value">30+</div>
                                <div className="hero__stat-label">Cartas disponibles</div>
                            </div>
                            <div>
                                <div className="hero__stat-value">10</div>
                                <div className="hero__stat-label">Sets principales</div>
                            </div>
                            <div>
                                <div className="hero__stat-value">OP-01</div>
                                <div className="hero__stat-label">Primer set</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURED CARDS ── */}
            <section style={{ padding: 'var(--space-2xl) 0', borderTop: '1px solid var(--color-border)' }}>
                <div className="container">
                    <div className="sets-section__header">
                        <h2 className="section-title">🔥 Cartas Destacadas</h2>
                        <Link to="/cards?sortBy=price_desc" className="btn btn--ghost">
                            Ver todas →
                        </Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-md)' }}>
                        {featured.map((card) => (
                            <Link
                                key={card.id}
                                to={`/cards/${card.id}`}
                                className="card-item"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <div className="card-item__image-wrap">
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                        className="card-item__img"
                                        loading="lazy"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                'https://placehold.co/358x500/1a1a28/8888a8?text=No+Image';
                                        }}
                                    />
                                    <div className="card-item__rarity-badge">
                                        <span className={`rarity-badge rarity-badge--${card.rarity === 'Secret Rare' ? 'secret' :
                                            card.rarity === 'Super Rare' ? 'sr' :
                                                card.rarity === 'Leader' ? 'leader' :
                                                    card.rarity === 'Rare' ? 'rare' : 'common'
                                            }`}>
                                            {card.rarity === 'Secret Rare' ? 'SEC' :
                                                card.rarity === 'Super Rare' ? 'SR' :
                                                    card.rarity === 'Leader' ? 'L' :
                                                        card.rarity === 'Rare' ? 'R' : 'C'}
                                        </span>
                                    </div>
                                </div>
                                <div className="card-item__info">
                                    <p className="card-item__name">{card.name}</p>
                                    <div className="card-item__meta">
                                        <span className="card-item__set">{card.setCode}</span>
                                        <span className="card-item__price">{card.price?.toFixed(2)} €</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SETS ── */}
            <section className="sets-section">
                <div className="container">
                    <div className="sets-section__header">
                        <h2 className="section-title">📦 Sets y Expansiones</h2>
                        <Link to="/cards" className="btn btn--ghost">
                            Ver catálogo →
                        </Link>
                    </div>
                    <div className="sets-grid">
                        {ALL_SETS.slice(0, 10).map((set) => (
                            <Link
                                key={set.code}
                                to={`/cards?set=${set.code}`}
                                className="set-card"
                            >
                                <span className="set-card__code">{set.code}</span>
                                <span className="set-card__name">{set.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{
                padding: 'var(--space-2xl) 0',
                borderTop: '1px solid var(--color-border)',
                textAlign: 'center'
            }}>
                <div className="container">
                    <div style={{ maxWidth: 560, margin: '0 auto' }}>
                        <p style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🏴‍☠️</p>
                        <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
                            ¿Listo para zarpar?
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)', fontSize: '1rem' }}>
                            Explora el catálogo completo de cartas One Piece TCG.
                            Sistema de usuarios y compra-venta próximamente.
                        </p>
                        <Link to="/cards" className="btn btn--primary" style={{ fontSize: '1.05rem', padding: '14px 36px' }}>
                            Ver todas las cartas →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
