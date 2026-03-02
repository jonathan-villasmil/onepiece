import { Link } from 'react-router-dom';
import type { Card } from '../types/card';
import { RarityBadge, ColorDot } from './CardBadges';

interface CardItemProps {
    card: Card;
    view?: 'grid' | 'list';
}

export function CardItem({ card, view = 'grid' }: CardItemProps) {
    if (view === 'list') {
        return (
            <Link to={`/cards/${card.id}`} className="card-list-item">
                <img
                    src={card.image}
                    alt={card.name}
                    className="card-list-item__thumb"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            'https://placehold.co/56x78/1a1a28/8888a8?text=OP';
                    }}
                />
                <div className="card-list-item__info">
                    <p className="card-list-item__name">{card.name}</p>
                    <div className="card-list-item__sub">
                        <span>{card.setCode}</span>
                        <span>{card.cardNumber}</span>
                        <span>
                            <RarityBadge rarity={card.rarity} />
                        </span>
                        <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                            {card.color.map((c) => (
                                <ColorDot key={c} color={c} size={10} />
                            ))}
                        </span>
                    </div>
                </div>
                {card.power !== undefined && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                        ⚡ {card.power.toLocaleString()}
                    </span>
                )}
                <span className="card-list-item__price">
                    {card.price !== undefined ? `${card.price.toFixed(2)} €` : '—'}
                </span>
            </Link>
        );
    }

    return (
        <Link to={`/cards/${card.id}`} className="card-item">
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
                    <RarityBadge rarity={card.rarity} />
                </div>
            </div>

            <div className="card-item__info">
                <p className="card-item__name">{card.name}</p>
                <div className="card-item__colors">
                    {card.color.map((c) => (
                        <ColorDot key={c} color={c} />
                    ))}
                </div>
                <div className="card-item__meta">
                    <span className="card-item__set">{card.setCode}</span>
                    <span className="card-item__price">
                        {card.price !== undefined ? `${card.price.toFixed(2)} €` : '—'}
                    </span>
                </div>
            </div>
        </Link>
    );
}
