import axios from 'axios';
import create from 'zustand';
import debounce from '../Cryptopage/helpers/debounce';

const API = process.env.REACT_APP_API_URL || 'https://capidex.onrender.com';

const homeStock = create((set) => ({
    stocks: [],
    trending: [],
    query: '',

    setQuery: (e) => {
        set({ query: e.target.value });
        homeStock.getState().searchStocks();
    },

    searchStocks: debounce(async () => {
        const { query, trending } = homeStock.getState();
        if (query.length > 1) {
            try {
                const res = await axios.get(`${API}/market/stocks/search?q=${query}`);
                set({ stocks: res.data?.length ? res.data : trending });
            } catch {
                set({ stocks: trending });
            }
        } else {
            set({ stocks: trending });
        }
    }, 400),

    fetchStocks: async () => {
        try {
            const res = await axios.get(`${API}/market/stocks/trending`);
            set({ stocks: res.data, trending: res.data });
        } catch (err) {
            console.error('fetchStocks error:', err);
        }
    },
}));

export default homeStock;