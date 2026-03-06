import React from 'react';
import { Link } from 'react-router-dom';

export default function ListItemWatchlist({ coin, deleteCoinlist }) {
    return (
        <tr>
            <td>
                <Link to={`/cryptocurrency/${coin.id}`} className="asset-link-cell">
                    <div className="watchlist-asset-name">{coin.name}</div>
                </Link>
            </td>
            <td><span className="type-badge crypto">CRYPTO</span></td>
            <td className="price-cell">
                ${Number(coin.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </td>
            <td>
                <button className="delete-btn" onClick={() => deleteCoinlist(coin._id)}>REMOVE</button>
            </td>
        </tr>
    );
}