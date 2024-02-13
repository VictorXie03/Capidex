import React, { useState, useEffect } from 'react';
import NavBar from './HomePage/NavBar';
import "./App.scss"
import LoginForm from './LoginForm';
import { Route, Routes } from 'react-router-dom';
import Home from './Cryptopage/pages/Home';
import Show from './Cryptopage/pages/Show';
import StockHome from './Stockpage/pages/StockHome';
import StockShow from './Stockpage/pages/StockShow';
import Watchlist from './Watchlist';


function App() {
    const [loggedIn, setloggedIn] = useState(false)
    const [coinlist, setCoinlist] = useState("")
    const [stocklist, setStocklist] = useState("")

    useEffect(() => {
        loginDetails()
    }, []);
    const getStocklist = async () => {
        const stocksFromServer = await fetchStocklist()
        setStocklist(stocksFromServer)
        console.log(stocksFromServer)
    }
    const getCoinlist = async () => {
        const coinsFromServer = await fetchCoinlist()
        setCoinlist(coinsFromServer)
        console.log(coinsFromServer)
    }
    const loginDetails = async (user) => {
        const res = await fetch('https://capidex.onrender.com/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (res.status == 200) {
            setloggedIn(true)
        }
    }
    const registerDetails = async (user) => {
        const res = await fetch('https://capidex.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await res.json()
    }
    const addStocklist = async (stock) => {
        getStocklist()
        const res = await fetch('https://capidex.onrender.com/stocklist', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name: stock.name, symbol: stock.symbol, price: stock.price })
        })

        const data = await res.json()
    }

    const addCoinlist = async (name, price, id) => {
        const res = await fetch('https://capidex.onrender.com/coinlist', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(name, price, id)
        })

        const data = await res.json()
    }

    useEffect(() => {
        getCoinlist()
    }, [loggedIn])

    const fetchCoinlist = async (coinlists) => {
        const res = await fetch('https://capidex.onrender.com/coinlist', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(coinlists)

        })
        const data = await res.json()
        return data
    }
    console.log(coinlist)

    useEffect(() => {

        getStocklist()
    }, [loggedIn])
    const fetchStocklist = async (stocklists) => {
        const res = await fetch('https://capidex.onrender.com/stocklist', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(stocklists)

        })
        const data = await res.json()
        return data
    }
    console.log(stocklist)

    const deleteCoinlist = async (id) => {
        const res = await fetch(`https://capidex.onrender.com/coinlist/${id}`, {
            credentials: 'include',
            method: 'DELETE',
        })
        const data = await res.json()
        if (!res.ok) {
            alert(data)
        }
        getCoinlist()

    }
    const deleteStocklist = async (id) => {
        const res = await fetch(`https://capidex.onrender.com/stocklist/${id}`, {
            credentials: 'include',
            method: 'DELETE',
        })
        const data = await res.json()
        if (!res.ok) {
            alert(data)
        }
        getStocklist()

    }

    const logout = async () => {
        const res = await fetch('https://capidex.onrender.com/user/logout', {
            credentials: 'include'
        })
        const data = await res.json()
        alert(data.msg)
        setCoinlist({})
        setStocklist({})
        setloggedIn(false)
    }
    return (
        <div>
            {loggedIn ?
                <div>
                    <NavBar onClick={logout} />
                    <Routes>
                        <Route path="/" element={<Watchlist coinlist={coinlist} stocklist={stocklist} deleteCoinlist={deleteCoinlist} deleteStocklist={deleteStocklist} />} />
                        <Route path="/cryptocurrency" element={<Home addCoinlist={addCoinlist} coinlist={coinlist} />} />
                        <Route path="/stocks" element={<StockHome addStocklist={addStocklist} stocklist={stocklist} />} />
                        <Route path="/cryptocurrency/:id" element={<Show />} />
                        <Route path="/stock/:symbol" element={<StockShow />} />
                    </Routes>
                </div> : <div className="home-page">
                    <LoginForm Login={loginDetails} Register={registerDetails} error=""></LoginForm>
                </div>

            }
        </div>

    );
}

export default App;