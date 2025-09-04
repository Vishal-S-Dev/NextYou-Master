import React, { memo } from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import Colors from '../constants/colors';
import Icon from './icon';

/**
 * Props for Toggle component
 */
export interface ToggleProps extends TouchableOpacityProps {
  /** Called when icon is pressed */
  onTouch: () => void;
  /** Current state */
  checked: boolean;
  /** Colour for the icon tint */
  iconColor?: string;
}

/**
 * Small Add / Delete circle toggle used in multi‑select list rows
 */
function Toggle({
  onTouch,
  checked,
  iconColor = Colors.primary,
  ...props
}: ToggleProps) {
  // console.log("Color:: checked", iconColor, checked);
  const icon = checked ? 'deleteCircle' : 'addCircle';
  //console.log("icon:: checked", icon);

  return (
    <TouchableOpacity
      onPress={onTouch}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...props}
    >
      <Icon name={icon} fill={iconColor} />
    </TouchableOpacity>
  );
}

export default memo(Toggle);
