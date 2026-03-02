import type { Card, CardRarity, CardColor, CardType } from '../types/card';

const BASE_URL = 'https://optcgapi.com/api';

// ── Raw API shape ──────────────────────────────────────────────
interface ApiCard {
    card_name: string;
    set_name: string;
    set_id: string;
    card_set_id: string;
    rarity: string;
    card_color: string;
    card_type: string;
    card_cost: string | null;
    card_power: string | null;
    counter_amount: string | null;
    card_text: string | null;
    sub_types: string | null;
    attribute: string | null;
    market_price: number | null;
    inventory_price: number | null;
    card_image: string;
    card_image_id: string;
}

// ── Mappers ────────────────────────────────────────────────────
function mapRarity(r: string): CardRarity {
    const map: Record<string, CardRarity> = {
        C: 'Common',
        UC: 'Uncommon',
        R: 'Rare',
        SR: 'Super Rare',
        SEC: 'Secret Rare',
        L: 'Leader',
        P: 'Promo',
    };
    return map[r] ?? 'Common';
}

function mapColor(raw: string): CardColor[] {
    const colors = raw.split('/').map((c) => c.trim());
    const valid = new Set<CardColor>(['Red', 'Green', 'Blue', 'Purple', 'Black', 'Yellow', 'Multi']);
    const mapped = colors
        .map((c) => {
            if (valid.has(c as CardColor)) return c as CardColor;
            return null;
        })
        .filter(Boolean) as CardColor[];
    if (mapped.length === 0) return ['Multi'];
    if (mapped.length > 1) return ['Multi'];
    return mapped;
}

function mapType(raw: string): CardType {
    const map: Record<string, CardType> = {
        Character: 'Character',
        Event: 'Event',
        Stage: 'Stage',
        Leader: 'Leader',
        "DON!!": 'DON!!',
    };
    return map[raw] ?? 'Character';
}

function mapApiCard(api: ApiCard): Card {
    // Deduplicate parallel arts: prefer non-_p1 variant; ignore _p2+
    const id = api.card_image_id;
    const name = api.card_name.replace(/\s*\(Parallel\)\s*/i, '').replace(/\s*\(\d+\)\s*/g, '').trim();

    return {
        id,
        cardNumber: api.card_set_id,
        name,
        set: api.set_name,
        setCode: api.set_id,
        rarity: mapRarity(api.rarity),
        color: mapColor(api.card_color),
        type: mapType(api.card_type),
        cost: api.card_cost ? parseInt(api.card_cost, 10) : undefined,
        power: api.card_power ? parseInt(api.card_power, 10) : undefined,
        counter: api.counter_amount ? parseInt(api.counter_amount, 10) : undefined,
        image: api.card_image,
        effect: api.card_text ?? undefined,
        attribute: api.attribute ?? undefined,
        character: api.sub_types ? api.sub_types.split(' ').filter(Boolean) : undefined,
        price: api.market_price ?? api.inventory_price ?? undefined,
    };
}

// ── In-memory cache ────────────────────────────────────────────
const cache = new Map<string, Card[]>();

// ── Public API ─────────────────────────────────────────────────

/** Fetch ALL set cards (all collections) */
export async function fetchAllCards(): Promise<Card[]> {
    const KEY = 'ALL';
    if (cache.has(KEY)) return cache.get(KEY)!;

    const res = await fetch(`${BASE_URL}/allSetCards/`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ApiCard[] = await res.json();

    // Remove parallel alt-art duplicates — keep _p1 as separate entry only if it's the only version
    const byCardNumber = new Map<string, ApiCard[]>();
    for (const c of data) {
        const key = c.card_set_id;
        if (!byCardNumber.has(key)) byCardNumber.set(key, []);
        byCardNumber.get(key)!.push(c);
    }

    const deduped: ApiCard[] = [];
    for (const [, variants] of byCardNumber) {
        // Prefer non-parallel if available, otherwise take first
        const base = variants.find((v) => !v.card_image_id.includes('_p'));
        deduped.push(base ?? variants[0]);
    }

    const cards = deduped.map(mapApiCard);
    cache.set(KEY, cards);
    return cards;
}

/** Fetch cards for a single set */
export async function fetchSetCards(setId: string): Promise<Card[]> {
    if (cache.has(setId)) return cache.get(setId)!;

    const res = await fetch(`${BASE_URL}/sets/${setId}/`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ApiCard[] = await res.json();
    const cards = data.map(mapApiCard);
    cache.set(setId, cards);
    return cards;
}

export interface ApiSet {
    set_id: string;
    set_name: string;
}

/** Fetch list of all available sets */
export async function fetchAllSets(): Promise<ApiSet[]> {
    if (cache.has('SETS')) return cache.get('SETS') as unknown as ApiSet[];
    const res = await fetch(`${BASE_URL}/allSets/`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data: ApiSet[] = await res.json();
    cache.set('SETS', data as unknown as Card[]);
    return data;
}
