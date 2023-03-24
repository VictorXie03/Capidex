import React from 'react';
import { useParams } from 'react-router-dom';
import showStore from '../stores/showStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export default function Show() {
    const [timeFormat, setTimeFormat] = useState('default');

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case '24h':
                return store.graphDataDay;
            case '7d':
                return store.graphDataWeek;
            case '1y':
                return store.graphDataYear;
            default:
                return store.graphData;
        }
    };

    const store = showStore();
    const params = useParams();

    React.useEffect(() => {
        store.fetchData(params.id);
    }, []);

    if (!store.data) return <></>;
    return (
        <div className="show-container">
            <header>
                <img className="resize" src={store.data.image.large} alt={store.data.name} />
                <h2>{store.data.name} ({store.data.symbol})</h2>
            </header>
            <div className="chart-container">
                <AreaChart
                    width={500}
                    height={400}
                    data={determineTimeFormat()}
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
                <div className="chart-buttons">
                    <button onClick={() => setTimeFormat('24h')}>24h</button>
                    <button onClick={() => setTimeFormat('7d')}>7d</button>
                    <button onClick={() => setTimeFormat('1y')}>1y</button>
                </div>
            </div>
            <div className="coin-info">
                <div>
                    <h4>Market cap rank</h4>
                    <span>{store.data.market_cap_rank}</span>
                </div>
                <div>
                    <h4>24h high</h4>
                    <span>${store.data.market_data.high_24h.usd}</span>
                </div>
                <div>
                    <h4>24h low</h4>
                    <span>${store.data.market_data.low_24h.usd}</span>
                </div>
                <div>
                    <h4>Circulating supply</h4>
                    <span>${store.data.market_data.circulating_supply}</span>
                </div>
                <div>
                    <h4>Current price</h4>
                    <span>${store.data.market_data.current_price.usd}</span>
                </div>
                <div>
                    <h4>1y change</h4>
                    <span>${store.data.market_data.price_change_percentage_1y.toFixed(2)}%</span>
                </div>
            </div>
        </div>
    );
}
