import { type MarkerProps } from '@react-native-community/slider';
import { type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
const SliderStepMarker: FC<MarkerProps> = ({ stepMarked, currentValue }) => {
  return (
    stepMarked && (
      <View style={styles.label}>
        {currentValue !== undefined ? (
          <Text>
            {currentValue % 1 === 0 ? currentValue : currentValue.toFixed(2)}
          </Text>
        ) : (
          <Text>{'-'}</Text>
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 28,
    //marginLeft: -2,
    //width: 55,
    //paddingVertical: 5,
    //paddingHorizontal: 10,
    //backgroundColor: '#ffffff',
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SliderStepMarker;
