declare module '*.svg' {
  import type * as React from 'react';
  import { type SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-multi-selectbox' {
  import type React from 'react';
  import { type TextStyle, type ViewStyle } from 'react-native';

  export type Option = { id: string; item: string };

  export interface MultiSelectBoxProps {
    label: string;
    options: Option[];
    selectedValues: Option[];
    onMultiSelect: (item: Option) => void;
    onTapClose: (item: Option) => void;
    isMulti?: boolean;
    arrowIconColor?: string;
    searchIconColor?: string;
    toggleIconColor?: string;
    multiOptionsLabelStyle: TextStyle;
    multiListEmptyLabelStyle: TextStyle;
    searchBoxStyles?: ViewStyle;
    searchBoxTextStyles?: TextStyle;
    listOptionProps: FlatListProps;
    containerStyle: ViewStyle;
  }

  const MultiSelectBox: React.FC<MultiSelectBoxProps>;
  export default MultiSelectBox;
}
