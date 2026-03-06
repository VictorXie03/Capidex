import axios from 'axios';
import create from 'zustand';
import debounce from '../helpers/debounce';

const API = process.env.REACT_APP_API_URL || 'https://capidex.onrender.com';

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',

    setQuery: (e) => {
        set({ query: e.target.value });
        homeStore.getState().searchCoins();
    },

    searchCoins: debounce(async () => {
        const { query, trending } = homeStore.getState();
        if (query.length > 1) {
            try {
                const res = await axios.get(`${API}/market/crypto/search?q=${query}`);
                set({ coins: res.data?.length ? res.data : trending });
            } catch {
                set({ coins: trending });
            }
        } else {
            set({ coins: trending });
        }
    }, 400),

    fetchCoins: async () => {
        try {
            const res = await axios.get(`${API}/market/crypto/trending`);
            set({ coins: res.data, trending: res.data });
        } catch (err) {
            console.error('fetchCoins error:', err);
        }
    },
}));

export default homeStore;