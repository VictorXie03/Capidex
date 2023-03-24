import React from 'react';
import { useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import showStock from '../showStock';

export default function StockShow() {
    const storeStock = showStock();
    const params = useParams();

    React.useEffect(() => {
        storeStock.fetchData(params.symbol);
    }, []);

    let data = [];
    if (storeStock.stockChartXValues) {
        for (var i = 0; i < storeStock.stockChartXValues.length; i++) {
            data.push({
                Date: storeStock.stockChartXValues[i],
                Price: parseFloat(storeStock.stockChartYValues[i]),
            });
        }
        data.reverse();
    }

    return (
        <div className="stock-show-container">
            <header>
                <h2 className="stock-symbol">{params.symbol}</h2>
            </header>
            <div className="chart-container">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </div>
            <div className="stock-info-container">
                {storeStock.data ? (
                    <div className="stock-info">
                        <div className="stock-info-row">
                            <h4 className="stock-info-label">Name</h4>
                            <span className="stock-info-value">{storeStock.data.Name}</span>
                        </div>
                        <div className="stock-info-row">
                            <h4 className="stock-info-label">Description</h4>
                            <span className="stock-info-value">{storeStock.data.Description}</span>
                        </div>
                        <div className="stock-info-row">
                            <h4 className="stock-info-label">Exchange</h4>
                            <span className="stock-info-value">{storeStock.data.Exchange}</span>
                        </div>
                        <div className="stock-info-row">
                            <h4 className="stock-info-label">Sector</h4>
                            <span className="stock-info-value">{storeStock.data.Sector}</span>
                        </div>
                        <div className="stock-info-row">
                            <h4 className="stock-info-label">Market Cap</h4>
                            <span className="stock-info-value">${storeStock.data.MarketCapitalization}</span>
                        </div>
                        <div className="stock-info-row">
                            <h4 className="stock-info-label">PE Ratio</h4>
                            <span className="stock-info-value">{storeStock.data.PERatio}</span>
                        </div>
                        <div className="stock-info-row">
                            <h4 className="stock-info-label">Dividend Per Share</h4>
                            <span className="stock-info-value">${storeStock.data.DividendPerShare}</span>
                        </div>
                        <div className="stock-info-row">
                            <h4 className="stock-info-label">EPS</h4>
                            <span className="stock-info-value">{storeStock.data.EPS}</span>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
