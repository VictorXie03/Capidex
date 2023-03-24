import React from 'react'
import homeStock from '../homeStock'
import ListItemStocks from '../ListItemStocks'

export default function StockHome({ addStocklist, stocklist }) {
    const stockstore = homeStock()

    React.useEffect(() => {
        stockstore.fetchStocks()
    }, [])

    return (
        <div>
            <header className="home-search">
                <div className="width">
                    <h2>Search for a stock</h2>
                    <input type="text" value={stockstore.query} onChange={stockstore.setQuery} />
                </div>
            </header>
            <div className="width">
                <h3>Top Stocks</h3>
                <div className="home-cryptos">
                    {stockstore.stocks.map(stock => {
                        return (
                            <ListItemStocks stocklist={stocklist} addStocklist={addStocklist} key={stock.symbol} stock={stock} />
                        )
                    })}
                </div>

            </div>

        </div>
    )
}