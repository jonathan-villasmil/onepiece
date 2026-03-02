import type { CardRarity, CardColor } from '../types/card';

interface RarityBadgeProps {
    rarity: CardRarity;
}

const RARITY_CLASS: Record<CardRarity, string> = {
    'Common': 'common',
    'Uncommon': 'uncommon',
    'Rare': 'rare',
    'Super Rare': 'sr',
    'Secret Rare': 'secret',
    'Leader': 'leader',
    'Promo': 'promo',
};

const RARITY_SHORT: Record<CardRarity, string> = {
    'Common': 'C',
    'Uncommon': 'UC',
    'Rare': 'R',
    'Super Rare': 'SR',
    'Secret Rare': 'SEC',
    'Leader': 'L',
    'Promo': 'P',
};

export function RarityBadge({ rarity }: RarityBadgeProps) {
    return (
        <span className={`rarity-badge rarity-badge--${RARITY_CLASS[rarity]}`}>
            {RARITY_SHORT[rarity]}
        </span>
    );
}

const COLOR_HEX: Record<CardColor, string> = {
    Red: '#e74c3c',
    Green: '#27ae60',
    Blue: '#2980b9',
    Purple: '#8e44ad',
    Black: '#7f8c8d',
    Yellow: '#f39c12',
    Multi: 'linear-gradient(135deg, #e74c3c, #f39c12, #27ae60)',
};

interface ColorDotProps {
    color: CardColor;
    size?: number;
}

export function ColorDot({ color, size = 8 }: ColorDotProps) {
    const isMulti = color === 'Multi';
    return (
        <span
            className="card-item__color-dot"
            title={color}
            style={{
                width: size,
                height: size,
                background: isMulti ? undefined : COLOR_HEX[color],
                backgroundImage: isMulti ? COLOR_HEX[color] : undefined,
            }}
        />
    );
}

export { COLOR_HEX };
