import {
  type FlatList,
  type StyleProp,
  type TextInput,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

/* ------------------------------------------------------------------
 * Types
 * ----------------------------------------------------------------*/
export interface Option {
  item: string;
  id: string;
}
export interface SelectBoxProps {
  label?: string;
  options?: Option[];
  value?: Option;
  preSelectedValues?: Option[];
  onChange?: (option: Option) => void;
  onMultiSelect?: (option: Option) => void;
  onTapClose?: (option: Option) => void;
  isMulti?: boolean;
  inputPlaceholder?: string;
  hideInputFilter?: boolean;
  width?: number | string;
  searchPlaceholder?: string;
  searchIconColor?: string;
  toggleIconColor?: string;
  listEmptyText?: string;
  /* style overrides */
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  optionsContainerStyle?: StyleProp<ViewStyle>;
  inputFilterContainerStyle?: StyleProp<ViewStyle>;
  inputFilterStyle?: StyleProp<TextStyle>;
  optionsLabelStyle?: StyleProp<TextStyle>;
  optionContainerStyle?: StyleProp<ViewStyle>;
  multiOptionContainerStyle?: StyleProp<ViewStyle>;
  multiOptionsLabelStyle?: StyleProp<TextStyle>;
  placeholderContainerStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  listEmptyLabelStyle?: StyleProp<TextStyle>;
  selectedItemStyle?: StyleProp<TextStyle>;
  listOptionProps?: Partial<React.ComponentProps<typeof FlatList>>;
  searchInputProps?: Partial<React.ComponentProps<typeof TextInput>>;
  onFocus?: () => void;
  onBlur?: () => void;
}
