export type CardRarity =
    | 'Common'
    | 'Uncommon'
    | 'Rare'
    | 'Super Rare'
    | 'Secret Rare'
    | 'Leader'
    | 'Promo';

export type CardColor =
    | 'Red'
    | 'Green'
    | 'Blue'
    | 'Purple'
    | 'Black'
    | 'Yellow'
    | 'Multi';

export type CardType = 'Character' | 'Event' | 'Stage' | 'Leader' | 'DON!!';

export interface Card {
    id: string;
    name: string;
    set: string;
    setCode: string;         // e.g. "OP-01"
    cardNumber: string;      // e.g. "OP01-001"
    rarity: CardRarity;
    color: CardColor[];
    type: CardType;
    cost?: number;
    power?: number;
    counter?: number;
    attribute?: string;
    image: string;
    effect?: string;
    trigger?: string;
    character?: string[];
    price?: number;          // Market price reference
}

export interface CardFilters {
    search: string;
    set: string;
    rarity: string;
    color: string;
    type: string;
    sortBy: 'name' | 'price_asc' | 'price_desc' | 'rarity' | 'number';
}

export const ALL_SETS = [
    { code: 'OP-01', name: 'Romance Dawn' },
    { code: 'OP-02', name: 'Paramount War' },
    { code: 'OP-03', name: 'Pillars of Strength' },
    { code: 'OP-04', name: 'Kingdoms of Intrigue' },
    { code: 'OP-05', name: 'Awakening of the New Era' },
    { code: 'OP-06', name: 'Wings of Captain' },
    { code: 'OP-07', name: '500 Years in the Future' },
    { code: 'OP-08', name: 'Two Legends' },
    { code: 'OP-09', name: 'Emperors in the New World' },
    { code: 'OP-10', name: 'Royal Blood' },
    { code: 'EB-01', name: 'Extra Booster Memorial Collection' },
    { code: 'PRB-01', name: 'Premium Booster THE BEST' },
    { code: 'ST-01', name: 'Starter Deck Straw Hat Crew' },
    { code: 'ST-02', name: 'Starter Deck Navy' },
    { code: 'ST-03', name: 'Starter Deck The Seven Warlords' },
];

export const ALL_RARITIES: CardRarity[] = [
    'Common', 'Uncommon', 'Rare', 'Super Rare', 'Secret Rare', 'Leader', 'Promo',
];

export const ALL_COLORS: CardColor[] = [
    'Red', 'Green', 'Blue', 'Purple', 'Black', 'Yellow', 'Multi',
];

export const ALL_TYPES: CardType[] = [
    'Character', 'Event', 'Stage', 'Leader', 'DON!!',
];
