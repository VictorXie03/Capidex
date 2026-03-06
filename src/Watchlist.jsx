import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Watchlist = ({ coinlist, stocklist, deleteCoinlist, deleteStocklist }) => {
  const coins = Array.isArray(coinlist) ? coinlist : [];
  const stocks = Array.isArray(stocklist) ? stocklist : [];
  const totalAssets = coins.length + stocks.length;

  // Portfolio value totals
  const cryptoTotal = useMemo(() =>
    coins.reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0),
    [coins]
  );
  const stockTotal = useMemo(() =>
    stocks.reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0),
    [stocks]
  );
  const portfolioTotal = cryptoTotal + stockTotal;

  const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="app-shell">
      <div className="watchlist-page">

        {/* Header */}
        <div className="watchlist-header">
          <span className="watchlist-title">MY WATCHLIST</span>
          <span className="watchlist-title">{totalAssets} ASSET{totalAssets !== 1 ? 'S' : ''}</span>
        </div>

        {/* Portfolio Tracker */}
        <div className="portfolio-tracker">
          <div className="tracker-stat">
            <div className="tracker-label">TOTAL PORTFOLIO VALUE</div>
            <div className="tracker-value">${fmt(portfolioTotal)}</div>
            <div className="tracker-sub">{totalAssets} positions tracked</div>
          </div>
          <div className="tracker-stat">
            <div className="tracker-label">CRYPTO EXPOSURE</div>
            <div className="tracker-value">${fmt(cryptoTotal)}</div>
            <div className="tracker-sub">{coins.length} coin{coins.length !== 1 ? 's' : ''}</div>
          </div>
          <div className="tracker-stat">
            <div className="tracker-label">EQUITY EXPOSURE</div>
            <div className="tracker-value">${fmt(stockTotal)}</div>
            <div className="tracker-sub">{stocks.length} stock{stocks.length !== 1 ? 's' : ''}</div>
          </div>
        </div>

        {totalAssets === 0 ? (
          <div className="empty-state">
            NO ASSETS IN WATCHLIST — ADD STOCKS OR CRYPTO TO BEGIN TRACKING
          </div>
        ) : (
          <table className="watchlist-table">
            <thead>
              <tr>
                <th>ASSET</th>
                <th>TYPE</th>
                <th>PRICE (USD)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coins.map(coin => (
                <tr key={coin._id}>
                  <td>
                    <Link to={`/cryptocurrency/${coin.id}`} className="asset-link-cell">
                      <div>
                        <div className="watchlist-asset-name">{coin.name}</div>
                      </div>
                    </Link>
                  </td>
                  <td><span className="type-badge crypto">CRYPTO</span></td>
                  <td className="price-cell">${fmt(parseFloat(coin.price) || 0)}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteCoinlist(coin._id)}>
                      REMOVE
                    </button>
                  </td>
                </tr>
              ))}
              {stocks.map(stock => (
                <tr key={stock._id}>
                  <td>
                    <Link to={`/stock/${stock.symbol}`} className="asset-link-cell">
                      <div>
                        <div className="watchlist-asset-name">{stock.name || stock.symbol}</div>
                        <div className="watchlist-asset-symbol">{stock.symbol}</div>
                      </div>
                    </Link>
                  </td>
                  <td><span className="type-badge stock">EQUITY</span></td>
                  <td className="price-cell">${fmt(parseFloat(stock.price) || 0)}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteStocklist(stock._id)}>
                      REMOVE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Watchlist;