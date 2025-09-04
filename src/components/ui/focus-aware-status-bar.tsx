import { StatusBar, type StatusBarStyle } from 'expo-status-bar';
import * as React from 'react';

type Props = {
  style?: StatusBarStyle;
  hidden?: boolean;
  translucent?: boolean;
};
export const FocusAwareStatusBar = ({
  style,
  hidden = false,
  translucent = true,
}: Props) => {
  // const isFocused = useIsFocused();
  //const { colorScheme } = useColorScheme();

  // if (Platform.OS === 'web') return null;

  // return isFocused ? <SystemBars style={colorScheme} hidden={hidden} /> : null;
  // return <StatusBar style={colorScheme} hidden={hidden} />;

  // return (
  //   <StatusBar
  //     style={style ? style : colorScheme === 'dark' ? 'light' : 'dark'}
  //     backgroundColor="transparent"
  //     translucent
  //     hidden={hidden}
  //   />
  // );

  return (
    <StatusBar
      style={style ? style : 'light'}
      backgroundColor="transparent"
      translucent={translucent}
      hidden={hidden}
    />
  );
};
