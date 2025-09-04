import React from 'react';
import { StyleSheet, View } from 'react-native';

import TimerButton from '@/components/ui/timer-button/timer-button';

interface TimerControlProps {
  value?: number;
  onStart?: () => void;
  onStop: (duration: number) => void;
}

const TimerControl: React.FC<TimerControlProps> = ({
  value = 0,
  onStart,
  onStop,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.pContainer}>
        <TimerButton
          currentDuration={value}
          onStart={onStart}
          onStop={onStop}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  start: {
    backgroundColor: '#4CAF50',
  },
  stop: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  pContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  pPercentageText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  pButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#8c1df4',
    borderRadius: 10,
  },
  pButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TimerControl;
