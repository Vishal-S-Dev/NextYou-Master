import { memo } from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

import { type Option } from '../type';
import Toggle from './toggle';
const OptionRow = memo(
  ({
    item,
    isMulti,
    onSelect,
    selected,
    style,
    labelStyle,
    iconColor,
  }: {
    item: Option;
    isMulti: boolean;
    onSelect: (item: Option) => void;
    selected: boolean;
    style?: StyleProp<ViewStyle>;
    labelStyle: StyleProp<TextStyle>;
    iconColor?: string;
  }) => {
    return (
      <View
        style={[
          {
            paddingHorizontal: 4,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: '#dadada',
            backgroundColor: '#fff',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
          style,
        ]}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => onSelect(item)}
          //hitSlop={hitSlop}
        >
          <Text
            style={[{ fontSize: 17, color: 'rgba(60,60,67,0.6)' }, labelStyle]}
          >
            {item.item}
          </Text>
          {isMulti && (
            <Toggle
              checked={selected}
              iconColor={iconColor}
              onTouch={() => onSelect(item)}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

export default memo(OptionRow);
