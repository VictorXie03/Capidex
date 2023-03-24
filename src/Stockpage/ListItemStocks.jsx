import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListItemStock({ stocklist, stock, addStocklist }) {

    const storedStock = stocklist.find((o) => o.symbol === stock.symbol);
    const isStocklistDisabled = storedStock ? true : false;

    const handleAddStocklist = () => {
        addStocklist({ name: stock.name, symbol: stock.symbol });
    }

    return (
        <div className="list-item-stock-container">
            <Link to={`/stock/${stock.symbol}`} className="stock-link">
                <span className="stock-name">{stock.name} </span>
                <span className="stock-symbol">{stock.symbol}</span>
                <span className="stock-price">{stock.price} USD</span>
            </Link>
            <button className="add-to-watchlist-btn" disabled={isStocklistDisabled} onClick={handleAddStocklist}>Add to Watchlist</button>
        </div>
    )
}
