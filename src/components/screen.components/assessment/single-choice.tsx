import React from 'react';
import { StyleSheet, View } from 'react-native';

import SelectUnselectOptionButton from '@/components/ui/select-unselect-option-button';

export interface Option {
  value: string;
  id: string;
}

type Props = {
  options: Option[];
  value: string;
  onSelect: (value: Option) => void;
};

const SingleChoice: React.FC<Props> = ({ options, value, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <SelectUnselectOptionButton
            key={option.value}
            type="radio"
            option={option.value}
            isSelected={isSelected}
            onSelect={() => onSelect(option)}
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
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    gap: 20,
  },
  selectedOption: {
    borderColor: '#6B4AEA',
    //backgroundColor: '#E0F0FF',
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

export default SingleChoice;
