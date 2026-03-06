import React from 'react';
import { useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import showStock from '../showStock';

export default function StockShow() {
    const storeStock = showStock();
    const params = useParams();

    React.useEffect(() => {
        storeStock.fetchData(params.symbol);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.symbol]);

    const data = storeStock.stockChartXValues.map((date, i) => ({
        Date: date,
        Price: parseFloat(storeStock.stockChartYValues[i]),
    }));

    const stock = storeStock.data;

    if (!stock) {
        return (
            <div className="stock-show-container">
                <p className="loading-text">LOADING_</p>
            </div>
        );
    }

    const changePositive = parseFloat(stock.change) >= 0;

    return (
        <div className="stock-show-container">
            <header className="show-header">
                <div className="show-header-left">
                    <h2 className="stock-symbol">{stock.symbol}</h2>
                    <span className="stock-name">{stock.name}</span>
                </div>
                <div className="show-header-right">
                    <span className="show-price">${stock.price}</span>
                    <span className={`show-change ${changePositive ? 'positive' : 'negative'}`}>
                        {changePositive ? '▲' : '▼'} {Math.abs(stock.change)} ({Math.abs(stock.changePercent)}%)
                    </span>
                </div>
            </header>

            <div className="show-chart-panel">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="stockGreen" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00ff88" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="1 4" stroke="#1e3a2f" vertical={false} />
                        <XAxis dataKey="Date" stroke="#3a5a47" tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#3a5a47' }} tickLine={false} axisLine={false} />
                        <YAxis stroke="#3a5a47" tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#3a5a47' }} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{ background: '#0a1a12', border: '1px solid #1e3a2f', fontFamily: 'IBM Plex Mono', fontSize: 12 }}
                            labelStyle={{ color: '#3a5a47' }}
                            itemStyle={{ color: '#00ff88' }}
                        />
                        <Area type="monotone" dataKey="Price" stroke="#00ff88" strokeWidth={1.5} fill="url(#stockGreen)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="show-stats-grid">
                <div className="show-stat">
                    <span className="show-stat-label">PRICE</span>
                    <span className="show-stat-value">${stock.price}</span>
                </div>
                <div className="show-stat">
                    <span className="show-stat-label">24H HIGH</span>
                    <span className="show-stat-value">${stock.high24}</span>
                </div>
                <div className="show-stat">
                    <span className="show-stat-label">24H LOW</span>
                    <span className="show-stat-value">${stock.low24}</span>
                </div>
                <div className="show-stat">
                    <span className="show-stat-label">52W HIGH</span>
                    <span className="show-stat-value">${stock.high52}</span>
                </div>
                <div className="show-stat">
                    <span className="show-stat-label">52W LOW</span>
                    <span className="show-stat-value">${stock.low52}</span>
                </div>
                <div className="show-stat">
                    <span className="show-stat-label">MARKET CAP</span>
                    <span className="show-stat-value">
                        {stock.marketCap ? `$${(stock.marketCap / 1e9).toFixed(2)}B` : 'N/A'}
                    </span>
                </div>
                <div className="show-stat">
                    <span className="show-stat-label">P/E RATIO</span>
                    <span className="show-stat-value">{stock.pe || 'N/A'}</span>
                </div>
                <div className="show-stat">
                    <span className="show-stat-label">EPS</span>
                    <span className="show-stat-value">{stock.eps || 'N/A'}</span>
                </div>
                <div className="show-stat">
                    <span className="show-stat-label">CHANGE</span>
                    <span className={`show-stat-value ${changePositive ? 'positive' : 'negative'}`}>
                        {changePositive ? '+' : ''}{stock.change} ({stock.changePercent}%)
                    </span>
                </div>
            </div>
        </div>
    );
}