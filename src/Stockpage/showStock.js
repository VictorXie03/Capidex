import axios from 'axios'
import create from 'zustand'

const API = process.env.REACT_APP_API_URL || 'https://capidex.onrender.com'

const showStock = create((set) => ({
    data: null,
    price: null,
    stockChartXValues: [],
    stockChartYValues: [],

    fetchData: async (symbol) => {
        set({ data: null }); // clear so loading state shows

        const res = await axios.get(`${API}/market/stocks/${symbol}`);
        const stock = res.data;

        const stockChartXValues = stock.graphData.map(d => d.Date);
        const stockChartYValues = stock.graphData.map(d => d.Price);

        set({
            data: stock,
            price: stock.price,
            stockChartXValues,
            stockChartYValues,
        });
    },
}));

export default showStock;