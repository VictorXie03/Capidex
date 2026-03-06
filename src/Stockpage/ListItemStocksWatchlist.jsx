import React from 'react';
import { Link } from 'react-router-dom';

export default function ListItemStocksWatchlist({ stock, deleteStocklist }) {
    return (
        <tr>
            <td>
                <Link to={`/stock/${stock.symbol}`} className="asset-link-cell">
                    <div>
                        <div className="watchlist-asset-name">{stock.name || stock.symbol}</div>
                        <div className="watchlist-asset-symbol">{stock.symbol}</div>
                    </div>
                </Link>
            </td>
            <td><span className="type-badge stock">EQUITY</span></td>
            <td className="price-cell">
                ${Number(stock.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td>
                <button className="delete-btn" onClick={() => deleteStocklist(stock._id)}>REMOVE</button>
            </td>
        </tr>
    );
}