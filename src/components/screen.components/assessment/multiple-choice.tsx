import React from 'react';
import { StyleSheet, View } from 'react-native';

import SelectUnselectOptionButton from '@/components/ui/select-unselect-option-button';

export interface Option {
  value: string;
  id: string;
}

type Props = {
  options: Option[];
  selectedValues: Option[];
  onChange: (newSelected: Option[]) => void;
};

const MultipleChoice: React.FC<Props> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const safeSelectedValues = selectedValues ?? [];

  const toggleOption = (option: Option) => {
    //console.log('option ::', option);
    const hasOption = safeSelectedValues.some(
      (obj) => obj.id === option.id && obj.value === option.value
    );
    if (hasOption) {
      onChange(safeSelectedValues.filter((val) => val.id !== option.id));
    } else {
      onChange([...safeSelectedValues, option]);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = safeSelectedValues.some(
          (obj) => obj.id === option.id && obj.value === option.value
        );
        //const isSelected = safeSelectedValues?.includes(option) ?? false;
        return (
          <SelectUnselectOptionButton
            key={option.id}
            type="check"
            option={option.value}
            isSelected={isSelected}
            onSelect={() => toggleOption(option)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginVertical: 24,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#E0F0FF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default MultipleChoice;
