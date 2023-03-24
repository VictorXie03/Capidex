import React from 'react'
import homeStore from '../stores/homeStore'
import ListItem from '../ListItem'

export default function Home({ addCoinlist, coinlist }) {
    const store = homeStore()

    React.useEffect(() => {
        store.fetchCoins()
    }, [])

    return (
        <div>
            <header className="home-search">
                <div className="width">
                    <h2>Search for a coin</h2>
                    <input type="text" value={store.query} onChange={store.setQuery} />
                </div>
            </header>

            <div className="width">
                <h3>Trending coins</h3>
                <div className="home-cryptos">
                    {store.coins.map(coin => {
                        return (
                            <ListItem coinlist={coinlist} addCoinlist={addCoinlist} key={coin.id} coin={coin} />

                        )
                    })}
                </div>

            </div>
        </div>
    )
}
