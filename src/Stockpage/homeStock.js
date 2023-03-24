import axios from 'axios'
import create from 'zustand'
import debounce from '../Cryptopage/helpers/debounce'

const homeStock = create((set) => ({
    stocks: [],
    query: '',

    setQuery: (e) => {
        set({ query: e.target.value })
        homeStock.getState().searchStocks()
    },

    searchStocks: debounce(async () => {
        const { query, trending } = homeStock.getState()

        if (query.length > 2) {
            const res = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=QD5VF4J0PRZS8TED
        `);

            const stocks = res.data.bestMatches.map(bestMatches => {
                return {
                    name: bestMatches["2. name"],
                    symbol: bestMatches["1. symbol"],
                };
            });

            console.log(stocks)

            set({ stocks });
        } else {
            set({ stocks: trending })
        }
    }, 500),
    fetchStocks: async () => {
        const [tslaRes, applRes, googRes, amznRes, metaRes] = await Promise.all([
            axios.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=QD5VF4J0PRZS8TED"),
            axios.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=QD5VF4J0PRZS8TED"),
            axios.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOGL&apikey=QD5VF4J0PRZS8TED"),
            axios.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AMZN&apikey=QD5VF4J0PRZS8TED"),
            axios.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=META&apikey=QD5VF4J0PRZS8TED"),
        ]);

        const stocks = [tslaRes, applRes, googRes, amznRes, metaRes].map(stock => {
            return {
                symbol: stock.data["Global Quote"]["01. symbol"],
                price: stock.data["Global Quote"]["05. price"]
            }
        })

        console.log(stocks);

        set({ stocks, trending: stocks })
    }

}))


export default homeStock