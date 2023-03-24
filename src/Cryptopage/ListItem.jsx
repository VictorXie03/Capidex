import React from 'react'
import { Link } from 'react-router-dom'


export default function ListItem({ coinlist, coin, addCoinlist }) {

    let storedCoin = coinlist.find((o) => o.id === coin.id);
    const coinlistDisabled = storedCoin ? true : false;
    return (
        <div className="home-crypto">
            <Link to={`/cryptocurrency/${coin.id}`}>
                <span className="home-crypto-image"><img src={coin.image} /></span>
                <span className="home-crypto-name">{coin.name}</span>
                <span className="home-crypto-prices">
                    <span>{coin.priceBtc} BTC</span>
                    <span>{coin.priceUsd} USD</span>
                </span>

            </Link><button disabled={coinlistDisabled} onClick={() => addCoinlist({ name: coin.name, price: coin.priceUsd, id: coin.id })}>Add to Watchlist</button>
        </div>


    )
}
