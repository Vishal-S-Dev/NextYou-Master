/* eslint-disable max-lines-per-function */

// https://github.com/sauzy34/react-native-multi-selectbox/tree/master/lib
import { isEmpty, uniqBy } from 'lodash';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  type NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  type TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

import Chip from './src/components/chip';
import Icon from './src/components/icon';
import OptionRow from './src/components/option-row';
import {
  Colors,
  hitSlop,
  MAX_DROPDOWN_HEIGHT,
  normalize,
} from './src/constants';
import type { Option, SelectBoxProps } from './src/type';
/* ------------------------------------------------------------------
 * Component
 * ----------------------------------------------------------------*/
function SelectBox({
  label, //= 'Label',
  options: propOptions = defaultOptions,
  preSelectedValues = [],
  value,
  isMulti = false,
  inputPlaceholder = 'Select',
  hideInputFilter = false,
  width = '100%',
  searchPlaceholder = 'Search here...',

  searchIconColor = Colors.primary,
  toggleIconColor = Colors.primary,
  listEmptyText = 'No results found',
  labelStyle,
  containerStyle,
  optionsContainerStyle,
  inputFilterContainerStyle,
  inputFilterStyle,
  optionsLabelStyle,
  optionContainerStyle,
  multiOptionContainerStyle,
  multiOptionsLabelStyle,
  placeholderContainerStyle,
  placeholderStyle,
  listEmptyLabelStyle,
  selectedItemStyle,
  listOptionProps,
  searchInputProps,
  onChange,
  onMultiSelect,
  onTapClose,
  onFocus,
  onBlur,
}: SelectBoxProps) {
  /* ---------------- state ---------------- */
  const [query, setQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Option[]>(propOptions);
  const [selected, setSelected] = useState<Option[]>(preSelectedValues);
  const rowY = useRef(0);

  /* -------------- derived ----------------- */
  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return options;
    return options.filter((o) => normalize(o.item).includes(normalizedQuery));
  }, [query, options]);

  const isSelected = useCallback(
    (id: string) => selected.some((s) => s.id === id),
    [selected]
  );

  /* -------------- handlers ---------------- */
  // const toggleDropdown = () => setShowOptions((p) => !p);
  const toggleDropdown = () => {
    setShowOptions((prev) => {
      const next = !prev;
      if (next) {
        onFocus?.(); // call onFocus when opening
      } else {
        onBlur?.(); // call onBlur when closing
      }
      return next;
    });
  };

  const addOption = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      if (options.some((o) => normalize(o.item) === normalize(trimmed))) return;
      const newOpt: Option = { item: trimmed, id: trimmed };
      setOptions((prev) => [...prev, newOpt]);
      if (isMulti) {
        setSelected((prev) => uniqBy([...prev, newOpt], 'id'));
        onMultiSelect?.(newOpt);
      } else {
        onChange?.(newOpt);
      }
      setQuery('');
    },
    [isMulti, onChange, onMultiSelect, options]
  );

  // const handleSubmit = (
  //   e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  // ) => addOption(e.nativeEvent.text);

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const text = e.nativeEvent.text.trim();

    if (!text) {
      Keyboard.dismiss(); // Dismiss keyboard if text is empty
      return;
    }

    addOption(text);
  };

  const handleToggle = useCallback(
    (item: Option) => {
      if (isMulti) {
        setSelected((prev) => {
          const exists = prev.some((s) => s.id === item.id);
          const next = exists
            ? prev.filter((s) => s.id !== item.id)
            : uniqBy([...prev, item], 'id');
          // Optimistically update selection
          requestAnimationFrame(() => {
            // eslint-disable-next-line no-unused-expressions
            exists ? onTapClose?.(item) : onMultiSelect?.(item);
          });
          return next;
        });
      } else {
        setShowOptions(false);
        onChange?.(item);
      }
    },
    [isMulti, onChange, onMultiSelect, onTapClose]
  );

  /* ---------------- UI -------------------- */
  return (
    <View style={[{ width } as ViewStyle]}>
      {/* outer container */}
      {/* Label */}
      {label && (
        <Text
          style={[
            { fontSize: 12, color: 'rgba(60,60,67,0.6)', marginBottom: 4 },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      {/* Field */}
      <View
        onLayout={(e) =>
          (rowY.current = e.nativeEvent.layout.y + e.nativeEvent.layout.height)
        }
        style={[containerStyle]}
      >
        {/* Multi Selection */}
        {isMulti ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggleDropdown}
            style={{
              paddingHorizontal: 10,
            }}
          >
            {/* Selected Options List*/}
            {selected.length ? (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingTop: 6,
                    minHeight: 80,
                  },
                  optionsContainerStyle,
                ]}
              >
                {selected.map((opt) => (
                  <Chip
                    key={opt.id}
                    item={opt}
                    handleToggle={handleToggle}
                    containerStyle={multiOptionContainerStyle}
                    labelStyle={multiOptionsLabelStyle}
                    toggleColor={toggleIconColor}
                  />
                ))}
              </View>
            ) : (
              // Placeholder
              <View
                style={[
                  {
                    minHeight: 80,
                    //justifyContent: 'center',
                    paddingVertical: 10,
                  },
                  placeholderContainerStyle,
                ]}
              >
                <Text
                  style={[
                    {
                      fontSize: 14,
                      color: 'rgba(60,60,67,0.3)',
                    },
                    placeholderStyle,
                  ]}
                >
                  {inputPlaceholder}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleDropdown} hitSlop={hitSlop}>
            <Text
              style={[
                {
                  fontSize: 17,
                  color: isEmpty(value?.item) ? 'rgba(60,60,67,0.3)' : '#000',
                },
                selectedItemStyle,
              ]}
            >
              {value?.item || inputPlaceholder || label}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Dropdown */}
      {showOptions && (
        <View
          style={{
            position: 'absolute',
            top: rowY.current + 4,
            left: 0,
            right: 0,
            zIndex: 999,
            //display: showOptions ? 'flex' : 'none',
            elevation: 5,
            backgroundColor: '#fff',
            overflow: 'hidden',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
          }}
        >
          {!hideInputFilter && (
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  //borderWidth: 1,
                  borderColor: '#ddd',
                  borderBottomWidth: 1,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                },
                inputFilterContainerStyle,
              ]}
            >
              <TextInput
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSubmit}
                placeholder={searchPlaceholder}
                blurOnSubmit={false}
                returnKeyType="done"
                style={[
                  {
                    flex: 1,
                    fontSize: 14,
                    height: 40,
                  },
                  inputFilterStyle,
                ]}
                placeholderTextColor="#000"
                {...searchInputProps}
              />
              <Icon name="searchBoxIcon" fill={searchIconColor} width={35} />
            </View>
          )}

          {/* Options list */}
          <FlatList<Option>
            data={filteredOptions}
            keyExtractor={(o) => o.id}
            renderItem={({ item }) => (
              <OptionRow
                item={item}
                isMulti={isMulti}
                onSelect={handleToggle}
                selected={isSelected(item.id)}
                style={optionContainerStyle}
                labelStyle={optionsLabelStyle}
                iconColor={toggleIconColor}
              />
            )}
            keyboardShouldPersistTaps="always"
            scrollEnabled={true} // KEY FIX
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews={Platform.OS === 'ios'} // false on Android
            //nestedScrollEnabled={true}
            ListEmptyComponent={() => (
              <View style={{ padding: 12, alignItems: 'center' }}>
                <Text style={[{ color: '#666' }, listEmptyLabelStyle]}>
                  {listEmptyText}
                </Text>
              </View>
            )}
            style={[
              {
                maxHeight: MAX_DROPDOWN_HEIGHT,
                backgroundColor: '#fff',
                //borderWidth: 1,
                borderColor: '#ddd',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                marginBottom: 2,
                overflow: 'hidden',
              },
              listOptionProps?.style,
            ]}
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
}

/* ------------------------------------------------------------------
 * Default fallback options
 * ----------------------------------------------------------------*/
const defaultOptions: Option[] = [
  { item: 'Aston Villa FC', id: 'AVL' },
  { item: 'West Ham United FC', id: 'WHU' },
  { item: 'Chelsea FC', id: 'CHE' },
  { item: 'Liverpool FC', id: 'LIV' },
  { item: 'Manchester United FC', id: 'MUN' },
  { item: 'Manchester City FC', id: 'MCI' },
];

export default memo(SelectBox);
