import axios from 'axios'
import create from 'zustand'

const showStock = create((set) => ({
    key: [],
    data: null,

    fetchData: async (symbol) => {
        const [stockgraphRes, dataRes, priceRes] = await Promise.all([
            axios.get(
                `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=QD5VF4J0PRZS8TED`),
            axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=
            QD5VF4J0PRZS8TED`),
            axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=
            QD5VF4J0PRZS8TED`)
        ]);

        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        let stockprice = [];
        console.log(stockgraphRes.data)
        for (const key in stockgraphRes.data["Time Series (Daily)"]) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(stockgraphRes.data["Time Series (Daily)"][key]['1. open'])

        };
        stockprice.push(priceRes.data["Global Quote"]['05. price'])

        console.log(dataRes.data)
        console.log(priceRes.data)
        set({ stockChartXValues: stockChartXValuesFunction, stockChartYValues: stockChartYValuesFunction });
        set({ data: dataRes.data })
        set({ price: stockprice })
    },
}));

export default showStock;