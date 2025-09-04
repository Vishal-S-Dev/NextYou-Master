import React, { memo } from 'react';
import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

import {
  Anxious,
  CravingSugar,
  diamond,
  Energetic,
  Irritated,
  MentallyTired,
  Overthinking,
  ruby,
} from '@/icons';

interface ShadowViewProps {
  children?: React.ReactNode; // Type for children
}

const ShadowView = ({ children }: ShadowViewProps) => {
  return <View style={styles.shadowContainer}>{children}</View>;
};

type CustomMarkerProps = {
  pressed: boolean;
  label: string;
};
const CustomMarker: React.FC<CustomMarkerProps> = ({ pressed, label }) => {
  const source: ImageSourcePropType = pressed ? ruby : diamond;

  const emoji = () => {
    switch (label) {
      case 'Anxious':
        return <Anxious width={22} height={22} />;
      case 'Mentally tired':
        return <MentallyTired width={22} height={22} />;
      case 'Energetic':
        return <Energetic width={22} height={22} />;
      case 'Craving sugar':
        return <CravingSugar width={22} height={22} />;
      case 'Irritated or angry':
        return <Irritated width={22} height={22} />;
      case 'Overthinking at night':
        return <Overthinking width={22} height={22} />;
      default:
        return (
          <Image style={styles.image} source={source} resizeMode="contain" />
        );
    }
  };
  return <ShadowView>{emoji()}</ShadowView>;
  //return <Image style={styles.image} source={source} resizeMode="contain" />;
};

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
  },
  shadowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 15,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // Android shadow
    elevation: 4,
    //top: 2,
  },
});

export default memo(CustomMarker);
