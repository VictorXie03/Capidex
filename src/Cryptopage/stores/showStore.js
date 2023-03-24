import axios from 'axios'
import create from 'zustand'

const showStore = create((set) => ({
    graphData: [],
    data: null,

    fetchData: async (id) => {
        const [graphRes, dataRes, day, week, year] = await Promise.all([
            axios.get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=121`),

            axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`),
            axios.get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`),
            axios.get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`),
            axios.get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`),

        ]);


        const graphData = graphRes.data.prices.map((price) => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us");
            return {
                Date: date,
                Price: p,
            };
        });

        const graphDataDay = day.data.prices.map((price) => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us");
            return {
                Date: date,
                Price: p,
            };
        });

        const graphDataWeek = week.data.prices.map((price) => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us");
            return {
                Date: date,
                Price: p,
            };
        });

        const graphDataYear = year.data.prices.map((price) => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us");
            return {
                Date: date,
                Price: p,
            };
        });

        console.log(dataRes)

        set({ graphData, graphDataDay, graphDataWeek, graphDataYear });
        set({ data: dataRes.data })

    },
}));

export default showStore;