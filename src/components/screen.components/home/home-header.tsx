import { LinearGradient } from 'expo-linear-gradient';
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native';

import { CoinBoxBG } from '@/icons';
import { colors } from '@/lib';
import { useUserStore } from '@/store';

import { HomeNavHeader } from './home-nav-header';
import { NotificationList } from './notification-list';
import { RewardsCard } from './reward-points';

interface HomeHeaderProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export function HomeHeader({ onLayout }: HomeHeaderProps) {
  const { user } = useUserStore();

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.9 }}
      colors={[colors.primary[500], colors.primary[500], '#2A1774']}
      style={{ width: '100%' }}
    >
      <CoinBoxBG preserveAspectRatio="xMidYMax meet" />
      <View style={styles.container} onLayout={onLayout}>
        <HomeNavHeader user={user} />
        <RewardsCard coins={user?.coins ?? 0} />
        <NotificationList />
        {/* <HomeTakeAssessmentAction /> */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    //backgroundColor: 'gray',
  },
});
