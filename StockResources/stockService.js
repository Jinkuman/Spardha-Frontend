import axios from 'axios';

const API_KEY = 'cq7msg9r01qormuila80cq7msg9r01qormuila8g';
const BASE_URL = 'https://finnhub.io/api/v1';

export const getStockPrice = async (symbol) => {
  try {
    const response = await axios.get(`${BASE_URL}/quote`, {
      params: {
        symbol: symbol,
        token: API_KEY,
      },
    });

    const priceData = [
      {
        time: new Date().toLocaleTimeString(),
        close: response.data.c,
      },
    ];

    return priceData;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
