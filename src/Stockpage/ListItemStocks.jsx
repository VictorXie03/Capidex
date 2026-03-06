import React from 'react';
import { Link } from 'react-router-dom';

export default function ListItemStocks({ stocklist, stock, addStocklist }) {
    const storedStock = Array.isArray(stocklist) && stocklist.find(o => o.symbol === stock.symbol);
    const isDisabled = !!storedStock;

    return (
        <div className="asset-card">
            <Link to={`/stock/${stock.symbol}`} className="asset-card-link">
                <div className="asset-header">
                    <div className="stock-ticker-badge">{stock.symbol}</div>
                    <div className="asset-name">{stock.name || stock.symbol}</div>
                </div>
                <div className="asset-prices">
                    <span className="price-usd">
                        ${stock.price ? Number(stock.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'}
                    </span>
                </div>
            </Link>
            <button
                className="watchlist-btn"
                disabled={isDisabled}
                onClick={() => addStocklist({ name: stock.name, symbol: stock.symbol, price: stock.price })}
            >
                {isDisabled ? '✓ IN WATCHLIST' : '+ ADD'}
            </button>
        </div>
    );
}