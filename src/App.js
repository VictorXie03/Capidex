import React, { useState, useEffect } from 'react';
import NavBar from './HomePage/NavBar';
import './App.scss';
import LoginForm from './LoginForm';
import { Route, Routes } from 'react-router-dom';
import Home from './Cryptopage/pages/Home';
import Show from './Cryptopage/pages/Show';
import StockHome from './Stockpage/pages/StockHome';
import StockShow from './Stockpage/pages/StockShow';
import Watchlist from './Watchlist';

const API = 'https://capidex.onrender.com';

const baseOpts = { credentials: 'include' };
const jsonOpts = { ...baseOpts, headers: { 'Content-Type': 'application/json' } };

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [coinlist, setCoinlist] = useState([]);
    const [stocklist, setStocklist] = useState([]);
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch(`${API}/user/login`, {
                    ...jsonOpts,
                    method: 'POST',
                    body: JSON.stringify({}),
                });
                if (res.status === 200) setLoggedIn(true);
            } catch { /* stay logged out */ }
            finally { setAuthChecked(true); }
        };
        checkSession();
    }, []);

    useEffect(() => {
        if (loggedIn) { getCoinlist(); getStocklist(); }
    }, [loggedIn]);

    const loginDetails = async (user) => {
        setAuthError('');
        const res = await fetch(`${API}/user/login`, { ...jsonOpts, method: 'POST', body: JSON.stringify(user) });
        const data = await res.json();
        if (res.status === 200) { setLoggedIn(true); }
        else { setAuthError(data.error || 'Login failed'); }
    };

    const registerDetails = async (user) => {
        setAuthError('');
        const res = await fetch(`${API}/user/register`, { ...jsonOpts, method: 'POST', body: JSON.stringify(user) });
        const data = await res.json();
        if (res.status === 201) { setAuthError('Account created! Please log in.'); }
        else { setAuthError(data.error || 'Registration failed'); }
    };

    const logout = async () => {
        await fetch(`${API}/user/logout`, baseOpts);
        setCoinlist([]); setStocklist([]); setLoggedIn(false);
    };

    const getCoinlist = async () => {
        const res = await fetch(`${API}/coinlist`, baseOpts);
        if (res.ok) setCoinlist(await res.json());
    };

    const addCoinlist = async (coin) => {
        await fetch(`${API}/coinlist`, { ...jsonOpts, method: 'POST', body: JSON.stringify({ name: coin.name, price: coin.price, id: coin.id }) });
        getCoinlist();
    };

    const deleteCoinlist = async (id) => {
        await fetch(`${API}/coinlist/${id}`, { ...baseOpts, method: 'DELETE' });
        getCoinlist();
    };

    const getStocklist = async () => {
        const res = await fetch(`${API}/stocklist`, baseOpts);
        if (res.ok) setStocklist(await res.json());
    };

    const addStocklist = async (stock) => {
        await fetch(`${API}/stocklist`, { ...jsonOpts, method: 'POST', body: JSON.stringify({ name: stock.name, symbol: stock.symbol, price: stock.price }) });
        getStocklist();
    };

    const deleteStocklist = async (id) => {
        await fetch(`${API}/stocklist/${id}`, { ...baseOpts, method: 'DELETE' });
        getStocklist();
    };

    if (!authChecked) return null;

    if (!loggedIn) return (
        <div className="home-page">
            <LoginForm Login={loginDetails} Register={registerDetails} error={authError} />
        </div>
    );

    return (
        <div>
            <NavBar onClick={logout} />
            <Routes>
                <Route path="/" element={<Watchlist coinlist={coinlist} stocklist={stocklist} deleteCoinlist={deleteCoinlist} deleteStocklist={deleteStocklist} />} />
                <Route path="/cryptocurrency" element={<Home addCoinlist={addCoinlist} coinlist={coinlist} />} />
                <Route path="/stocks" element={<StockHome addStocklist={addStocklist} stocklist={stocklist} />} />
                <Route path="/cryptocurrency/:id" element={<Show />} />
                <Route path="/stock/:symbol" element={<StockShow />} />
            </Routes>
        </div>
    );
}

export default App;