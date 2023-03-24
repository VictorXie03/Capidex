import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'


export default function ListItemWatchlist({ coin, deleteCoinlist }) {
    console.log(coin)
    return (
        <div className="home-crypto">
            <Link to={`/cryptocurrency/${coin.id}`}>
                <span className="watchlist-crypto-name">{coin.name}</span>

                <span className="watchlist-crypto-prices">
                    <span>{coin.price} USD</span>
                </span>
            </Link>
            <button onClick={() => deleteCoinlist(coin._id)}><AiOutlineClose /></button>
        </div>
    )
}
