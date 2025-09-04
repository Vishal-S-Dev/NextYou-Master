import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  useController,
} from 'react-hook-form';
import {
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import { type DietaryPreference } from '@/mock/preferences';

import { PreferenceCard } from './preference-card';

type ControlledPreferencePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: DietaryPreference[];
  onChange?: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const ControlledPreferencePicker = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  onChange,
  containerStyle,
  labelStyle,
}: ControlledPreferencePickerProps<T>) => {
  const { fieldState } = useController({ control, name });

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange: formOnChange } }) => (
          <View style={styles.grid}>
            {options.map((opt) => (
              <PreferenceCard
                key={opt.id}
                title={opt.title}
                subtitle={opt.subtitle}
                active={value === opt.id}
                onPress={() => {
                  formOnChange(opt.id);
                  onChange?.(opt.id);
                }}
                icon={<Ionicons name={opt.icon} size={20} />}
              />
            ))}
          </View>
        )}
      />
      {fieldState.error && (
        <Text style={styles.error}>{fieldState.error?.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#161616B3',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
});
