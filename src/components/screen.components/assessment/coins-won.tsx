import { Platform, StyleSheet, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Text } from '@/components/ui';
import { CoinBox } from '@/icons';
import { Font, TextAlign, TextSize } from '@/lib';

export type CoinsWonProps = {
  coins: number;
};

const CoinsWon: React.FC<CoinsWonProps> = ({ coins }) => {
  return (
    <View style={styles.coinContainer}>
      <View
        className={twMerge(
          'rounded-2xl bg-white shadow-xl p-12 items-center',
          Platform.OS === 'ios'
            ? 'shadow-blue-500/20'
            : 'shadow-blue-500/60 elevation-xl'
        )}
      >
        <Text
          font={Font.IBMPlexSans_500Medium}
          size={TextSize['2xl']}
          textAlign={TextAlign.center}
          className="px-6"
        >
          Congratulations !! You’ve Won
        </Text>
        <Text
          font={Font.IBMPlexSans_700Bold}
          size={TextSize['4xl']}
          textAlign={TextAlign.center}
          className="px-10 color-[#4F2BDA]"
        >
          {coins} Coins
        </Text>
        <CoinBox width={150} height={150} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  coinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CoinsWon;
