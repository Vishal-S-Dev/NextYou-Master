import { memo, useCallback } from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

import { Colors, hitSlop } from '../constants';
import { type Option } from '../type';
import Icon from './icon';

interface ChipProps {
  item: Option;
  handleToggle: (option: Option) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  toggleColor: string;
}

const Chip = memo(
  ({
    item,
    handleToggle,
    containerStyle,
    labelStyle,
    toggleColor = '#fff',
  }: ChipProps) => {
    const handleRemove = useCallback(
      () => handleToggle(item),
      [item, handleToggle]
    );

    return (
      <View
        style={[
          {
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 8,
            borderRadius: 20,
            marginRight: 6,
            marginBottom: 6,
            backgroundColor: Colors.primary,
            alignItems: 'center',
            gap: 8,
          },
          containerStyle,
        ]}
      >
        <Text style={[{ fontSize: 10, color: '#fff' }, labelStyle]}>
          {item.item}
        </Text>
        <TouchableOpacity
          //style={{ padding: 1 }}
          hitSlop={hitSlop}
          onPress={handleRemove}
        >
          <Icon name="closeCircle" fill={toggleColor} width={16} height={16} />
        </TouchableOpacity>
      </View>
    );
  }
);

export default memo(Chip);
