import React, { useState } from 'react';
import {
  Image,
  type LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { GradientWrapper } from '@/components/ui';
import CircularProgressBar from '@/components/ui/circular-progress-bar';
import { homeHealthBG, SleepIcon, StepIcon } from '@/icons';
import { Font } from '@/lib';
import { activityData } from '@/mock/home-components-mock-data';

export const HealthSummary = () => {
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [chartContentWidth, setChartContentWidth] = useState<number>(0);
  // const granted = useHealthPermissions();

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const onLayoutChartContent = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setChartContentWidth(width);
  };

  const ActivityProgressContent = (
    <>
      <CircularProgressBar
        size={120}
        width={10}
        fill={89}
        gradientSteps={['#F8ACFF', '#5C61FF']}
      >
        <Text style={styles.percentValue}>89</Text>
        <Text style={styles.percentText}>Percent</Text>
      </CircularProgressBar>
      <View style={{ flex: 1 }}>
        <Text style={styles.totalActivitiesText}>
          Total Activities completed
        </Text>
        <Text style={styles.completedActivities}>
          15<Text style={styles.totalActivities}> / 20</Text>
        </Text>
      </View>
    </>
  );

  const StepsContent = (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <StepIcon />
        <View>
          <Text style={styles.cardText}>Steps</Text>
          <Text style={styles.completedActivities}>
            15<Text style={styles.totalActivities}> / 20</Text>
          </Text>
        </View>
      </View>
    </View>
  );

  const SleepContent = (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <SleepIcon />
        <View>
          <Text style={styles.cardText}>Sleep</Text>
          <Text style={styles.completedActivities}>
            15<Text style={styles.totalActivities}> / 20</Text>
          </Text>
        </View>
      </View>
    </View>
  );

  const ActivityChart = (
    <View style={{ flex: 1, gap: 10 }} onLayout={onLayoutChartContent}>
      <Text style={styles.cardText}>Activity Analytics</Text>
      <LineChart
        data={{
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              data: activityData,
              color: (_opacity = 1) => '#F34E3A55', // optional
            },
          ],
        }}
        width={chartContentWidth}
        height={180}
        chartConfig={{
          //backgroundGradientFromOpacity: 0,
          //backgroundGradientToOpacity: 0,
          fillShadowGradientFrom: '#F34E3A',
          fillShadowGradientTo: '#F34E3A',
          color: () => `#ffffff`,
          labelColor: () => `#ccc`,
        }}
        //bezier
        style={{
          //backgroundColor: 'gray',
          //marginVertical: 8,
          borderRadius: 12,
          //paddingVertical: 8,
          paddingRight: 10,
        }}
        withHorizontalLabels={false}
        //withInnerLines={false}
        withHorizontalLines={false}
        //yLabelsOffset={10}
        transparent
        //fromZero
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#13093D' }}>
      {/* Background */}
      <Image
        style={{
          position: 'absolute',
          height: contentHeight,
          width: '100%',
          opacity: 0.4,
        }}
        resizeMode="cover"
        source={homeHealthBG}
      />

      <View style={styles.container} onLayout={onLayout}>
        <Text style={styles.sectionTitle}>Health Summary</Text>

        {/* Activity Progress */}
        <GradientWrapper
          colors={['#5C61FF99', '#F8ACFF66']}
          style={[styles.gradient]}
          children={ActivityProgressContent}
        />

        {/* {!granted && (
          <Text style={{ textAlign: 'center', color: '#fff' }}>
            Health permissions denied ❌
          </Text>
        )} */}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <GradientWrapper
            colors={['#5C61FF99', '#F8ACFF66']}
            style={[styles.gradient, styles.gradientSteps]}
            children={StepsContent}
          />
          <GradientWrapper
            colors={['#5C61FF99', '#F8ACFF66']}
            style={[styles.gradient, styles.gradientSteps]}
            children={SleepContent}
          />
        </View>
        <GradientWrapper
          colors={['#5C61FF99', '#F8ACFF66']}
          style={[styles.gradient, styles.gradientSteps]}
          children={ActivityChart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    //backgroundColor: '#13093D',
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.IBMPlexSans_600SemiBold,
    color: '#fff',
    marginBottom: 8,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  gradientSteps: {
    flex: 1,
  },
  percentValue: {
    fontFamily: Font.Montserrat_700Bold,
    fontSize: 24,
    color: '#fff',
  },
  percentText: {
    fontFamily: Font.Montserrat_500Medium,
    fontSize: 14,
    color: '#fff',
  },
  totalActivitiesText: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 16,
    color: '#fff',
  },
  completedActivities: {
    fontFamily: Font.Montserrat_800ExtraBold,
    fontSize: 24,
    color: '#EB8468',
  },
  totalActivities: {
    fontFamily: Font.Montserrat_600SemiBold,
    fontSize: 12,
    color: '#fff',
  },
  cardText: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 12,
    color: '#fff',
  },
});
