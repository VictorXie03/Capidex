import React from 'react';
import homeStock from '../homeStock';
import ListItemStocks from '../ListItemStocks';

export default function StockHome({ addStocklist, stocklist }) {
    const stockstore = homeStock();

    React.useEffect(() => {
        stockstore.fetchStocks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app-shell">
            <header className="home-search">
                <div className="search-label">EQUITY SEARCH</div>
                <div className="search-input-wrapper">
                    <span className="search-prefix">&gt;_</span>
                    <input
                        type="text"
                        value={stockstore.query}
                        onChange={stockstore.setQuery}
                        placeholder="Search by ticker or company name..."
                    />
                </div>
            </header>

            <div className="page-container">
                <div className="section-header">
                    <h3>TOP EQUITIES</h3>
                    <div className="section-line" />
                </div>
                <div className="home-cryptos">
                    {stockstore.stocks.map(stock => (
                        <ListItemStocks
                            key={stock.symbol}
                            stock={stock}
                            stocklist={stocklist}
                            addStocklist={addStocklist}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}