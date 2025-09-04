import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Font } from '@/lib';

import CustomLabel from './custom-label-below';
import CustomMarker from './custom-marker';

export interface ScaleOption {
  label: string;
  id: string;
  minValue: number;
  maxValue: number;
}

export interface ScaleOptionValue {
  id: string;
  label?: string;
  value: number;
}

type Props = {
  options: ScaleOption[];
  questionId: string;
  currentAnswer: ScaleOptionValue[];
  onChangeAnswer: (value: ScaleOptionValue) => void;
};
const ScaleOptionRenderer: React.FC<Props> = ({
  options,
  currentAnswer,
  onChangeAnswer,
}) => {
  const getAnswer = (id: string) => {
    const ans = currentAnswer.filter((val) => val.id === id);
    if (ans.length > 0) {
      return ans[0].value;
    }
    return 0;
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scaleContainer}
    >
      {options.map((option) => {
        return (
          <View key={option.id} style={styles.scaleItem}>
            <Text style={styles.scaleLabel}>{option.label}</Text>
            <View
              style={{
                paddingHorizontal: 0,
                // backgroundColor: 'red',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MultiSlider
                min={option.minValue}
                max={option.maxValue}
                selectedStyle={{
                  borderRadius: 6,
                  backgroundColor: '#6B4AEA',
                }}
                unselectedStyle={{
                  borderRadius: 6,
                  backgroundColor: '#D9D1C2',
                }}
                values={[getAnswer(option.id)]}
                containerStyle={{
                  height: 40,
                  //backgroundColor: 'blue',
                }}
                trackStyle={{
                  height: 8,
                }}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40,
                }}
                customMarker={(e) => (
                  <CustomMarker {...e} label={option.label} />
                )}
                markerOffsetY={2}
                //markerOffsetX={8}
                customLabel={CustomLabel}
                sliderLength={210}
                enableLabel={true}
                snapped={true}
                onValuesChange={(val) =>
                  onChangeAnswer({
                    id: option.id,
                    label: option.label,
                    value: val[0],
                  })
                }
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    //maxHeight: 400, // Adjust as needed or remove if using flex: 1 in parent
  },
  scaleContainer: {
    paddingBottom: 40,
  },
  scaleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 38,
  },
  scaleLabel: {
    fontFamily: Font.IBMPlexSans_400Regular,
    fontSize: 14,
    color: '#000',
    width: 84,
  },
  rulerContainer: {
    marginTop: 24,
  },
});

export default ScaleOptionRenderer;
