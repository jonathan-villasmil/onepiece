import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllSets } from '../services/cardService';
import type { ApiSet } from '../services/cardService';

const SET_EMOJI: Record<string, string> = {
    'OP-01': '⚓', 'OP-02': '⚔️', 'OP-03': '🏛️', 'OP-04': '👑',
    'OP-05': '🌊', 'OP-06': '🕊️', 'OP-07': '🌀', 'OP-08': '🏴‍☠️',
    'OP-09': '🌍', 'OP-10': '🔺', 'OP-11': '⚡', 'OP-12': '📜',
    'OP-13': '🗡️', 'EB-01': '💎', 'EB-02': '🎬', 'EB-03': '💫',
    'PRB-01': '✨', 'PRB-02': '🌟',
};

export function SetsPage() {
    const [sets, setSets] = useState<ApiSet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllSets()
            .then(setSets)
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const boosterSets = sets.filter((s) => s.set_id.startsWith('OP-'));
    const extraSets = sets.filter((s) => s.set_id.startsWith('EB-') || s.set_id.startsWith('PRB-'));
    const otherSets = sets.filter((s) => !s.set_id.startsWith('OP-') && !s.set_id.startsWith('EB-') && !s.set_id.startsWith('PRB-'));

    const SetCard = ({ set }: { set: ApiSet }) => (
        <Link to={`/cards?set=${set.set_id}`} className="set-card">
            <span style={{ fontSize: '1.8rem' }}>{SET_EMOJI[set.set_id] ?? '🃏'}</span>
            <span className="set-card__code">{set.set_id}</span>
            <span className="set-card__name">{set.set_name}</span>
        </Link>
    );

    const Skeleton = () => (
        <div className="set-card" style={{ pointerEvents: 'none', opacity: 0.4 }}>
            <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--color-bg-elevated)' }} />
            <div style={{ height: 14, width: 60, borderRadius: 4, background: 'var(--color-bg-elevated)' }} />
            <div style={{ height: 12, width: 120, borderRadius: 4, background: 'var(--color-bg-elevated)' }} />
        </div>
    );

    return (
        <div style={{ padding: 'var(--space-xl) 0 var(--space-2xl)' }}>
            <div className="container">
                <div style={{ marginBottom: 'var(--space-xl)' }}>
                    <h1 className="section-title">📦 Sets y Colecciones</h1>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-sm)', fontSize: '0.95rem' }}>
                        {loading ? 'Cargando...' : `${sets.length} colecciones disponibles`}
                    </p>
                </div>

                {/* Main Booster Sets */}
                <section style={{ marginBottom: 'var(--space-2xl)' }}>
                    <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <span>⚓</span> Sets Principales
                    </h2>
                    <div className="sets-grid">
                        {loading
                            ? Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} />)
                            : boosterSets.map((s) => <SetCard key={s.set_id} set={s} />)
                        }
                    </div>
                </section>

                {/* Extra / Premium Sets */}
                {(loading || extraSets.length > 0) && (
                    <section style={{ marginBottom: 'var(--space-2xl)' }}>
                        <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <span>✨</span> Extra & Premium Boosters
                        </h2>
                        <div className="sets-grid">
                            {loading
                                ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)
                                : extraSets.map((s) => <SetCard key={s.set_id} set={s} />)
                            }
                        </div>
                    </section>
                )}

                {/* Other sets (Starter Decks, etc.) */}
                {(!loading && otherSets.length > 0) && (
                    <section>
                        <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <span>🎴</span> Otros Sets
                        </h2>
                        <div className="sets-grid">
                            {otherSets.map((s) => <SetCard key={s.set_id} set={s} />)}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)', padding: 'var(--space-xl)', borderTop: '1px solid var(--color-border)' }}>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
                        ¿Quieres ver todas las cartas de todos los sets?
                    </p>
                    <Link to="/cards" className="btn btn--primary" style={{ fontSize: '1rem', padding: '12px 28px' }}>
                        Ver catálogo completo →
                    </Link>
                </div>
            </div>
        </div>
    );
}
