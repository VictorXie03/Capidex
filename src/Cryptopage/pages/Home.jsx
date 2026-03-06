import React from 'react';
import homeStore from '../stores/homeStore';
import ListItem from '../ListItem';

export default function Home({ addCoinlist, coinlist }) {
    const store = homeStore();

    React.useEffect(() => {
        store.fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app-shell">
            <header className="home-search">
                <div className="search-label">CRYPTOCURRENCY SEARCH</div>
                <div className="search-input-wrapper">
                    <span className="search-prefix">&gt;_</span>
                    <input
                        type="text"
                        value={store.query}
                        onChange={store.setQuery}
                        placeholder="Search by name or symbol..."
                    />
                </div>
            </header>

            <div className="page-container">
                <div className="section-header">
                    <h3>TRENDING COINS</h3>
                    <div className="section-line" />
                </div>
                <div className="home-cryptos">
                    {store.coins.map(coin => (
                        <ListItem
                            key={coin.id}
                            coin={coin}
                            coinlist={coinlist}
                            addCoinlist={addCoinlist}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}