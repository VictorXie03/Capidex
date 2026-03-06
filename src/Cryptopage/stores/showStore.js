import axios from 'axios';
import create from 'zustand';

const API = process.env.REACT_APP_API_URL || 'https://capidex.onrender.com';

const showStore = create((set) => ({
    data: null,
    graphData: [],
    graphDataDay: [],
    graphDataWeek: [],
    graphDataYear: [],

    fetchData: async (id) => {
        // Reset data so loading screen shows when switching coins
        set({ data: null });

        try {
            const res = await axios.get(`${API}/market/crypto/${id}`);
            set({
                data: res.data.data,
                graphData: res.data.graphData,
                graphDataDay: res.data.graphDataDay,
                graphDataWeek: res.data.graphDataWeek,
                graphDataYear: res.data.graphDataYear,
            });
        } catch (err) {
            console.error('showStore fetchData error:', err);
        }
    },
}));

export default showStore;