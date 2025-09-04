import React, { useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import RulerPicker from '@/components/ui/ruler-picker/ruler-picker';
import SwitchSelector from '@/components/ui/switch-selector';
import { type Option as UnitOption } from '@/components/ui/switch-selector';
import { Font } from '@/lib';
export interface Unit {
  id: string;
  unit: string;
  label: string;
}

interface RulerValue {
  id: string;
  unit: string;
  value: string;
}

type Props = {
  units: Unit[];
  min: number;
  max: number;
  currentAnswer: RulerValue;
  valueChange: (value: RulerValue) => void;
};

const Ruler: React.FC<Props> = ({
  min = 20,
  max = 200,
  units,
  currentAnswer,
  valueChange,
}) => {
  const safeAnswer = currentAnswer ?? {};

  const unitIndex = useMemo(
    () => units.findIndex((u) => u.unit === safeAnswer.unit),
    [units, safeAnswer.unit]
  );

  const handleUnitChange = (unit: UnitOption) => {
    valueChange({
      ...safeAnswer,
      unit: unit.label,
      id: unit.value,
    });
  };

  const handleValueChange = (val: number) => {
    valueChange({
      ...safeAnswer,
      value: String(val),
    });
  };

  const initialValue = useMemo(
    () => Number(safeAnswer.value ?? min),
    [safeAnswer.value, min]
  );

  const options = units.map((obj) => ({ label: obj.label, value: obj.id }));

  return (
    <View style={styles.rulerContainer}>
      {safeAnswer && (
        <>
          <SwitchSelector
            value={unitIndex >= 0 ? unitIndex : 0}
            onPress={handleUnitChange}
            textColor="#BBB5D0"
            selectedColor="#000"
            buttonColor="#DCD5F8"
            borderColor="#BBB5D0"
            hasPadding
            options={options}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
            height={44}
            style={{ width: 220 }}
            textStyle={{ fontFamily: Font.IBMPlexSans_500Medium, fontSize: 16 }}
            selectedTextStyle={{
              fontFamily: Font.IBMPlexSans_500Medium,
              fontSize: 16,
            }}
            returnObject={true}
          />
          <View
            className={twMerge(
              'rounded-2xl bg-white shadow-xl',
              Platform.OS === 'ios'
                ? 'shadow-blue-500/20'
                : 'shadow-blue-500/60 elevation-xl'
            )}
          >
            <RulerPicker
              initialValue={initialValue}
              minValue={min}
              maxValue={max}
              step={1}
              unit={currentAnswer?.unit ?? ''}
              onValueChange={handleValueChange}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rulerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 40,
  },
});

export default Ruler;
