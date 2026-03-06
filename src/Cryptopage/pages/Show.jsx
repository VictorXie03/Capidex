import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import showStore from '../stores/showStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Show() {
    const [timeFormat, setTimeFormat] = useState('default');
    const store = showStore();
    const params = useParams();

    React.useEffect(() => {
        store.fetchData(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case '24h': return store.graphDataDay;
            case '7d': return store.graphDataWeek;
            case '1y': return store.graphDataYear;
            default: return store.graphData;
        }
    };

    if (!store.data) return (
        <div className="app-shell">
            <div className="show-loading">
                <span className="loading-cursor">LOADING_</span>
            </div>
        </div>
    );

    const priceChange = store.data.market_data.price_change_percentage_1y;
    const isPositive = priceChange >= 0;

    const customTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="chart-tooltip">
                    <p className="tooltip-price">${Number(payload[0].value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</p>
                    <p className="tooltip-date">{payload[0].payload.Date}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="app-shell">
            <div className="show-container">

                {/* Header */}
                <div className="show-header">
                    <div className="show-header-left">
                        <img src={store.data.image.large} alt={store.data.name} className="show-coin-img" />
                        <div>
                            <h1 className="show-coin-name">{store.data.name}</h1>
                            <span className="show-coin-symbol">{store.data.symbol.toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="show-header-right">
                        <div className="show-current-price">
                            ${Number(store.data.market_data.current_price.usd).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className={`show-price-change ${isPositive ? 'positive' : 'negative'}`}>
                            {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}% (1Y)
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="show-chart-panel">
                    <div className="show-chart-header">
                        <span className="show-chart-label">PRICE CHART</span>
                        <div className="chart-buttons">
                            {['24h', '7d', '1y'].map(t => (
                                <button
                                    key={t}
                                    className={`chart-btn ${timeFormat === t ? 'active' : ''}`}
                                    onClick={() => setTimeFormat(t)}
                                >
                                    {t.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                        <AreaChart data={determineTimeFormat()} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00ff88" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="1 4" stroke="#1e3a2f" vertical={false} />
                            <XAxis dataKey="Date" tick={{ fill: '#3a5a47', fontSize: 10, fontFamily: 'IBM Plex Mono' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#3a5a47', fontSize: 10, fontFamily: 'IBM Plex Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `$${Number(v).toLocaleString()}`} width={80} />
                            <Tooltip content={customTooltip} />
                            <Area type="monotone" dataKey="Price" stroke="#00ff88" strokeWidth={1.5} fill="url(#priceGrad)" dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats Grid */}
                <div className="show-stats-grid">
                    {[
                        { label: 'MARKET CAP RANK', value: `#${store.data.market_cap_rank}`, highlight: false },
                        { label: '24H HIGH', value: `$${Number(store.data.market_data.high_24h.usd).toLocaleString()}`, highlight: true },
                        { label: '24H LOW', value: `$${Number(store.data.market_data.low_24h.usd).toLocaleString()}`, highlight: false },
                        { label: 'CURRENT PRICE', value: `$${Number(store.data.market_data.current_price.usd).toLocaleString()}`, highlight: true },
                        { label: 'CIRCULATING SUPPLY', value: Number(store.data.market_data.circulating_supply).toLocaleString(), highlight: false },
                        { label: '1Y CHANGE', value: `${priceChange.toFixed(2)}%`, highlight: false, change: true, positive: isPositive },
                    ].map(stat => (
                        <div key={stat.label} className="show-stat-card">
                            <div className="show-stat-label">{stat.label}</div>
                            <div className={`show-stat-value ${stat.change ? (stat.positive ? 'positive' : 'negative') : ''}`}>
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}