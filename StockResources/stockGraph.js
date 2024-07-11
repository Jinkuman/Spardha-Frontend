import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getStockPrice } from './stockService';

const StockGraph = ({ stockSymbol }) => {
  const [stockPrices, setStockPrices] = useState([]);
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const priceData = await getStockPrice(stockSymbol);
        const prices = priceData.map(item => parseFloat(item.close));
        const times = priceData.map(item => item.time);
        setStockPrices(prices);
        setLabels(times);
      } catch (error) {
        setError('Error fetching stock data');
      }
    };

    fetchStockData();
  }, [stockSymbol]);

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: stockPrices,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default StockGraph;
