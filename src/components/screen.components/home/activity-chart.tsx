import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { activityData } from '@/mock/home-components-mock-data';

export function ActivityChart() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Analytics</Text>
      <LineChart
        data={{
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{ data: activityData }],
        }}
        width={300}
        height={180}
        chartConfig={{
          //backgroundGradientFrom: '#2e135a',
          //backgroundGradientTo: '#2e135a',
          color: () => `#ffffff`,
          labelColor: () => `#ccc`,
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
