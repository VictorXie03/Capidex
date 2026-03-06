import React from 'react';
import { Link } from 'react-router-dom';

export default function ListItem({ coinlist, coin, addCoinlist }) {
    const storedCoin = Array.isArray(coinlist) && coinlist.find(o => o.id === coin.id);
    const isDisabled = !!storedCoin;

    return (
        <div className="asset-card">
            <Link to={`/cryptocurrency/${coin.id}`} className="asset-card-link">
                <div className="asset-header">
                    {coin.image && <img src={coin.image} alt={coin.name} className="asset-img" />}
                    <div>
                        <div className="asset-name">{coin.name}</div>
                    </div>
                </div>
                <div className="asset-prices">
                    <span className="price-usd">
                        ${Number(coin.priceUsd).toLocaleString('en-US', { maximumFractionDigits: 4 })}
                    </span>
                    {coin.priceBtc && (
                        <span className="price-btc">{coin.priceBtc} BTC</span>
                    )}
                </div>
            </Link>
            <button
                className="watchlist-btn"
                disabled={isDisabled}
                onClick={() => addCoinlist({ name: coin.name, price: coin.priceUsd, id: coin.id })}
            >
                {isDisabled ? '✓ IN WATCHLIST' : '+ ADD'}
            </button>
        </div>
    );
}