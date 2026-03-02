import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { CardFilters } from '../types/card';

import { useCards } from '../hooks/useCards';
import { fetchAllSets } from '../services/cardService';
import type { ApiSet } from '../services/cardService';
import { CardItem } from '../components/CardItem';
import { FiltersPanel } from '../components/FiltersPanel';

const CARDS_PER_PAGE = 24;

const DEFAULT_FILTERS: CardFilters = {
    search: '',
    set: '',
    rarity: '',
    color: '',
    type: '',
    sortBy: 'number',
};

export function CatalogPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [page, setPage] = useState(1);
    const [sets, setSets] = useState<ApiSet[]>([]);

    const { cards, loading, error, retry } = useCards();

    const [filters, setFilters] = useState<CardFilters>({
        ...DEFAULT_FILTERS,
        set: searchParams.get('set') || '',
        rarity: searchParams.get('rarity') || '',
        sortBy: (searchParams.get('sortBy') as CardFilters['sortBy']) || 'number',
    });

    // Fetch real set list from API
    useEffect(() => {
        fetchAllSets().then(setSets).catch(() => { });
    }, []);

    const updateFilter = (partial: Partial<CardFilters>) => {
        setFilters((prev) => ({ ...prev, ...partial }));
        setPage(1);
    };

    const clearFilters = () => {
        setFilters(DEFAULT_FILTERS);
        setSearchParams({});
        setPage(1);
    };

    const filtered = useMemo(() => {
        let result = [...cards];

        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(
                (c) => c.name.toLowerCase().includes(q) || c.cardNumber.toLowerCase().includes(q)
            );
        }
        if (filters.set) result = result.filter((c) => c.setCode === filters.set);
        if (filters.rarity) result = result.filter((c) => c.rarity === filters.rarity);
        if (filters.color) result = result.filter((c) => c.color.includes(filters.color as any));
        if (filters.type) result = result.filter((c) => c.type === filters.type);

        switch (filters.sortBy) {
            case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'price_asc': result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0)); break;
            case 'price_desc': result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0)); break;
            case 'rarity': {
                const order: Record<string, number> = {
                    'Secret Rare': 0, 'Super Rare': 1, 'Rare': 2,
                    'Leader': 3, 'Uncommon': 4, 'Common': 5, 'Promo': 6,
                };
                result.sort((a, b) => (order[a.rarity] ?? 99) - (order[b.rarity] ?? 99));
                break;
            }
            default: result.sort((a, b) => a.cardNumber.localeCompare(b.cardNumber));
        }
        return result;
    }, [cards, filters]);

    const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

    // Build page number range (show limited range around current page)
    const getPageNumbers = () => {
        const delta = 2;
        const range: (number | '...')[] = [];
        const left = Math.max(1, page - delta);
        const right = Math.min(totalPages, page + delta);
        if (left > 1) { range.push(1); if (left > 2) range.push('...'); }
        for (let i = left; i <= right; i++) range.push(i);
        if (right < totalPages) { if (right < totalPages - 1) range.push('...'); range.push(totalPages); }
        return range;
    };

    return (
        <div className="catalog-page">
            <div className="container">
                <div className="catalog-page__header">
                    <h1 className="catalog-page__title">Catálogo de Cartas</h1>
                    <p className="catalog-page__subtitle">
                        {loading
                            ? 'Cargando todas las cartas del One Piece TCG...'
                            : `${cards.length.toLocaleString()} cartas de ${sets.length} colecciones`}
                    </p>
                </div>

                {/* Search bar */}
                <div className="search-bar" style={{ marginBottom: 'var(--space-xl)' }}>
                    <span className="search-bar__icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o número de carta... (ej: Luffy, OP01-003)"
                        className="search-bar__input"
                        value={filters.search}
                        onChange={(e) => updateFilter({ search: e.target.value })}
                    />
                </div>

                {/* Error state */}
                {error && (
                    <div style={{
                        background: 'rgba(192,57,43,0.15)',
                        border: '1px solid rgba(192,57,43,0.4)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-lg)',
                        marginBottom: 'var(--space-xl)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-md)',
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                        <div>
                            <p style={{ fontWeight: 600, marginBottom: 4 }}>Error al cargar las cartas</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{error}</p>
                        </div>
                        <button className="btn btn--outline" onClick={retry} style={{ marginLeft: 'auto', flexShrink: 0 }}>
                            Reintentar
                        </button>
                    </div>
                )}

                <div className="catalog-layout">
                    {/* Filters sidebar */}
                    <FiltersPanel
                        filters={filters}
                        onChange={updateFilter}
                        onClear={clearFilters}
                        sets={sets}
                    />

                    {/* Main content */}
                    <div>
                        {/* Toolbar */}
                        <div className="catalog-toolbar">
                            <p className="catalog-toolbar__count">
                                {loading ? (
                                    <span style={{ color: 'var(--color-text-muted)' }}>⏳ Cargando...</span>
                                ) : (
                                    <>
                                        <span>{filtered.length.toLocaleString()}</span>
                                        {' '}carta{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
                                        {cards.length > 0 && filtered.length !== cards.length && (
                                            <span style={{ color: 'var(--color-text-muted)', marginLeft: 8 }}>
                                                (de {cards.length.toLocaleString()} total)
                                            </span>
                                        )}
                                    </>
                                )}
                            </p>
                            <div className="catalog-toolbar__right">
                                <select
                                    className="sort-select"
                                    value={filters.sortBy}
                                    onChange={(e) => updateFilter({ sortBy: e.target.value as CardFilters['sortBy'] })}
                                >
                                    <option value="number">Nº de carta</option>
                                    <option value="name">Nombre (A-Z)</option>
                                    <option value="price_asc">Precio: menor a mayor</option>
                                    <option value="price_desc">Precio: mayor a menor</option>
                                    <option value="rarity">Rareza</option>
                                </select>

                                <div className="view-toggle">
                                    <button
                                        className={`view-toggle__btn ${view === 'grid' ? 'active' : ''}`}
                                        onClick={() => setView('grid')}
                                        title="Vista cuadrícula"
                                    >⊞</button>
                                    <button
                                        className={`view-toggle__btn ${view === 'list' ? 'active' : ''}`}
                                        onClick={() => setView('list')}
                                        title="Vista lista"
                                    >≡</button>
                                </div>
                            </div>
                        </div>

                        {/* Loading skeleton */}
                        {loading && (
                            <div className="cards-grid">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="card-item" style={{ pointerEvents: 'none' }}>
                                        <div
                                            className="card-item__image-wrap"
                                            style={{
                                                background: 'linear-gradient(90deg, var(--color-bg-elevated) 25%, var(--color-bg-glass) 50%, var(--color-bg-elevated) 75%)',
                                                backgroundSize: '200% 100%',
                                                animation: 'shimmer 1.5s infinite',
                                            }}
                                        />
                                        <div className="card-item__info">
                                            <div style={{
                                                height: 14, borderRadius: 4,
                                                background: 'var(--color-bg-elevated)',
                                                marginBottom: 8,
                                            }} />
                                            <div style={{
                                                height: 10, width: '60%', borderRadius: 4,
                                                background: 'var(--color-bg-elevated)',
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Cards */}
                        {!loading && (
                            <>
                                {paginated.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-state__icon">🏴‍☠️</div>
                                        <p className="empty-state__title">No se encontraron cartas</p>
                                        <p className="empty-state__text">
                                            Prueba a cambiar los filtros o el término de búsqueda
                                        </p>
                                        <button
                                            className="btn btn--outline"
                                            onClick={clearFilters}
                                            style={{ marginTop: 'var(--space-md)' }}
                                        >
                                            Limpiar filtros
                                        </button>
                                    </div>
                                ) : view === 'grid' ? (
                                    <div className="cards-grid">
                                        {paginated.map((card) => (
                                            <CardItem key={card.id} card={card} view="grid" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="cards-list">
                                        {paginated.map((card) => (
                                            <CardItem key={card.id} card={card} view="list" />
                                        ))}
                                    </div>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="pagination">
                                        <button
                                            className="pagination__btn"
                                            onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo(0, 0); }}
                                            disabled={page === 1}
                                        >←</button>
                                        {getPageNumbers().map((n, i) =>
                                            n === '...' ? (
                                                <span key={`dot-${i}`} style={{ color: 'var(--color-text-muted)', padding: '0 4px' }}>…</span>
                                            ) : (
                                                <button
                                                    key={n}
                                                    className={`pagination__btn ${n === page ? 'active' : ''}`}
                                                    onClick={() => { setPage(n as number); window.scrollTo(0, 0); }}
                                                >{n}</button>
                                            )
                                        )}
                                        <button
                                            className="pagination__btn"
                                            onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}
                                            disabled={page === totalPages}
                                        >→</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
