import React from 'react'
import ListItemWatchlist from './Cryptopage/ListItemWatchlist'
import ListItemStocksWatchlist from './Stockpage/ListItemStocksWatchlist'

const Watchlist = ({ coinlist, stocklist, deleteCoinlist, deleteStocklist }) => {

  return (
    <div className="watchlist" >
      <p>My Watchlist</p>
      <hr></hr>
      {Array.isArray(coinlist) ? coinlist.map(coin => {
        console.log(coin)
        return (
          <ListItemWatchlist addCoinlist={null} key={coin._id} coin={coin} deleteCoinlist={deleteCoinlist} />

        )
      }) : <div></div>}
      {Array.isArray(stocklist) ? stocklist.map(stock => {
        return (
          <ListItemStocksWatchlist addStocklist={null} key={stock.symbol} stock={stock} deleteStocklist={deleteStocklist} />

        )
      }) : <div></div>}</div>

  )
}

export default Watchlist