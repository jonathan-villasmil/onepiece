import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAllCards } from '../services/cardService';
import type { Card } from '../types/card';
import { RarityBadge, ColorDot } from '../components/CardBadges';

export function CardDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [card, setCard] = useState<Card | null | undefined>(undefined); // undefined = loading

    useEffect(() => {
        fetchAllCards().then((all) => {
            const found = all.find((c) => c.id === id);
            setCard(found ?? null);
        }).catch(() => setCard(null));
    }, [id]);

    // Loading state
    if (card === undefined) {
        return (
            <div className="detail-page">
                <div className="container">
                    <div className="detail-layout" style={{ opacity: 0.4, pointerEvents: 'none' }}>
                        <div style={{
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--color-bg-elevated)',
                            aspectRatio: '716 / 1000',
                        }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            {[200, 300, 120, 80].map((w, i) => (
                                <div key={i} style={{
                                    height: i === 0 ? 48 : 20,
                                    width: `${w}px`,
                                    borderRadius: 8,
                                    background: 'var(--color-bg-elevated)',
                                }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Not found
    if (card === null) {
        return (
            <div className="container">
                <div className="not-found">
                    <div className="not-found__code">404</div>
                    <p className="not-found__title">Carta no encontrada</p>
                    <p className="not-found__text">
                        Esta carta no existe o no está disponible.
                    </p>
                    <button
                        className="btn btn--primary"
                        style={{ marginTop: 'var(--space-lg)' }}
                        onClick={() => navigate('/cards')}
                    >
                        ← Volver al catálogo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="detail-page">
            <div className="container">
                <button className="detail-page__back" onClick={() => navigate(-1)}>
                    ← Volver
                </button>

                <div className="detail-layout">
                    {/* Card image */}
                    <div className="detail-card-wrap">
                        <img
                            src={card.image}
                            alt={card.name}
                            className="detail-card-img"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    'https://placehold.co/400x560/1a1a28/8888a8?text=No+Image';
                            }}
                        />
                    </div>

                    {/* Info */}
                    <div>
                        <div className="detail-info__header">
                            <p className="detail-info__number">{card.cardNumber}</p>
                            <h1 className="detail-info__name">{card.name}</h1>
                            <div className="detail-info__badges">
                                <RarityBadge rarity={card.rarity} />
                                {card.color.map((c) => (
                                    <span
                                        key={c}
                                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}
                                    >
                                        <ColorDot color={c} size={10} />
                                        {c}
                                    </span>
                                ))}
                                <span className="badge" style={{ background: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                                    {card.type}
                                </span>
                            </div>
                        </div>

                        {/* Price box */}
                        <div className="detail-price-box">
                            <p className="detail-price-box__label">Precio de mercado</p>
                            <p className="detail-price-box__value">
                                {card.price !== undefined ? `${card.price.toFixed(2)} €` : 'N/D'}
                            </p>
                            <div className="detail-price-box__actions">
                                <button
                                    className="btn btn--primary"
                                    style={{ flex: 1, opacity: 0.5, cursor: 'not-allowed' }}
                                >
                                    🛒 Comprar — Próximamente
                                </button>
                                <button
                                    className="btn btn--outline"
                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                >
                                    ♡ Wantlist
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="detail-stats">
                            <div className="detail-stat">
                                <div className="detail-stat__value">
                                    {card.cost !== undefined ? card.cost : '—'}
                                </div>
                                <div className="detail-stat__label">Coste</div>
                            </div>
                            <div className="detail-stat">
                                <div className="detail-stat__value">
                                    {card.power !== undefined ? card.power.toLocaleString() : '—'}
                                </div>
                                <div className="detail-stat__label">Poder</div>
                            </div>
                            <div className="detail-stat">
                                <div className="detail-stat__value">
                                    {card.counter !== undefined ? card.counter.toLocaleString() : '—'}
                                </div>
                                <div className="detail-stat__label">Counter</div>
                            </div>
                        </div>

                        {/* Set */}
                        <div className="detail-section">
                            <p className="detail-section__title">Set y Expansión</p>
                            <p className="detail-section__text">
                                <strong>{card.setCode}</strong> — {card.set}
                            </p>
                        </div>

                        {/* Effect */}
                        {card.effect && (
                            <div className="detail-section">
                                <p className="detail-section__title">Efecto</p>
                                <p className="detail-section__text">{card.effect}</p>
                            </div>
                        )}

                        {/* Characters / Subtypes */}
                        {card.character && card.character.length > 0 && (
                            <div className="detail-section">
                                <p className="detail-section__title">Personajes / Grupos</p>
                                <div className="detail-characters">
                                    {card.character.map((ch) => (
                                        <span key={ch} className="detail-character-tag">{ch}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Attribute */}
                        {card.attribute && (
                            <div className="detail-section">
                                <p className="detail-section__title">Atributo</p>
                                <p className="detail-section__text">{card.attribute}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
