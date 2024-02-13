import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'

export default function ListItemStocksWatchlist({ stock, deleteStocklist }) {
    return (

        <div className="home-crypto">
            <Link to={`/stock/${stock.symbol}`}>
                <span className="watchlist-crypto-name">{stock.name} </span>
                <span className="watchlist-crypto-prices">{stock.price} USD</span>
            </Link><button onClick={() => deleteStocklist(stock._id)}><AiOutlineClose /></button>

        </div>
    )
}