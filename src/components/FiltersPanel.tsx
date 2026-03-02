import type { CardFilters, CardColor } from '../types/card';
import { ALL_RARITIES, ALL_TYPES } from '../types/card';
import { COLOR_HEX } from './CardBadges';
import type { ApiSet } from '../services/cardService';

const COLORS: CardColor[] = ['Red', 'Green', 'Blue', 'Purple', 'Black', 'Yellow'];
const COLOR_LABEL: Record<CardColor, string> = {
    Red: 'Rojo', Green: 'Verde', Blue: 'Azul',
    Purple: 'Morado', Black: 'Negro', Yellow: 'Amarillo', Multi: 'Multi',
};

interface FiltersPanelProps {
    filters: CardFilters;
    onChange: (f: Partial<CardFilters>) => void;
    onClear: () => void;
    sets?: ApiSet[];
}

export function FiltersPanel({ filters, onChange, onClear, sets = [] }: FiltersPanelProps) {
    return (
        <aside className="filters-panel">
            <div className="filters-panel__title">
                Filtros
                <button className="filters-panel__clear" onClick={onClear}>
                    Limpiar todo
                </button>
            </div>

            {/* Set */}
            <div className="filter-group">
                <label className="filter-group__label">Set / Expansión</label>
                <select
                    className="filter-select"
                    value={filters.set}
                    onChange={(e) => onChange({ set: e.target.value })}
                >
                    <option value="">Todos los sets</option>
                    {sets.map((s) => (
                        <option key={s.set_id} value={s.set_id}>
                            {s.set_id} — {s.set_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Rarity */}
            <div className="filter-group">
                <label className="filter-group__label">Rareza</label>
                <select
                    className="filter-select"
                    value={filters.rarity}
                    onChange={(e) => onChange({ rarity: e.target.value })}
                >
                    <option value="">Todas las rarezas</option>
                    {ALL_RARITIES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            {/* Type */}
            <div className="filter-group">
                <label className="filter-group__label">Tipo</label>
                <select
                    className="filter-select"
                    value={filters.type}
                    onChange={(e) => onChange({ type: e.target.value })}
                >
                    <option value="">Todos los tipos</option>
                    {ALL_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            {/* Colors */}
            <div className="filter-group">
                <label className="filter-group__label">Color</label>
                <div className="filter-colors">
                    {COLORS.map((color) => (
                        <button
                            key={color}
                            className={`filter-color-btn ${filters.color === color ? 'active' : ''}`}
                            title={COLOR_LABEL[color]}
                            style={{ background: COLOR_HEX[color] }}
                            onClick={() =>
                                onChange({ color: filters.color === color ? '' : color })
                            }
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
}
