import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ImagePath } from '@/api';
import TimerCard from '@/components/timer-card';
import { Font } from '@/lib';
import { type TaskDetails } from '@/types';

type PointsEarnProps = {
  points: string;
  bgColor?: string;
  textColor?: string;
};
const PointsEarn = memo(({ points, bgColor, textColor }: PointsEarnProps) => {
  return (
    <View
      style={[styles.pointsContainer, bgColor && { backgroundColor: bgColor }]}
    >
      <Text style={[styles.points, textColor && { color: textColor }]}>
        Earn
      </Text>
      <Text style={[styles.points, textColor && { color: textColor }]}>
        {points} pts
      </Text>
    </View>
  );
});

export interface TaskListCardProps {
  item: TaskDetails;
  isTodayTask?: boolean;
  onPress?: () => void;
}
const TaskListCard: React.FC<TaskListCardProps> = ({
  item,
  isTodayTask,
  onPress,
}) => {
  const CardContent = ({ textColor }: { textColor?: string }) => {
    return (
      <>
        <Image
          source={{ uri: ImagePath(item.bannerImage) }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text
            style={[styles.title, textColor && { color: textColor }]}
            numberOfLines={3}
          >
            {item.title}
          </Text>
          {item.subTitle && (
            <Text style={[styles.subText, textColor && { color: textColor }]}>
              {item.subTitle}
            </Text>
          )}
        </View>
        <PointsEarn points={`${item.points}`} />
        {item.isMustDo && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Must Do</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={onPress}
      android_ripple={{ color: '#ECECEC' }}
    >
      {item.type === '3' ? (
        !isTodayTask ? (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.9 }}
            colors={['#5C61FF', '#2A1774']}
            style={[styles.container, styles.gradient]}
          >
            <CardContent textColor="#fff" />
          </LinearGradient>
        ) : (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.9 }}
            colors={['#5C61FF', '#2A1774']}
            style={[styles.container, styles.gradient]}
          >
            <TimerCard
              imageSource={item.bannerImage}
              title={item.title}
              startTime={item.startTime}
              endTime={item.endTime}
              mustDo={true}
              peoples={item.peoples?.map((person) => person.image)}
            />
            <PointsEarn
              points={`${item.points}`}
              bgColor="#FFFFFF55"
              textColor="#fff"
            />
          </LinearGradient>
        )
      ) : (
        <View style={styles.container}>
          <CardContent />
        </View>
      )}
    </Pressable>
  );
};

// const CARD_HEIGHT = 82;
const THUMB_SIZE = 64;

const styles = StyleSheet.create({
  container: {
    // height: CARD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 12,
    padding: 8,
    margin: 8,

    backgroundColor: '#FFFFFF',
    //backgroundColor: 'red',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#00000099',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  // gradient wrapper uses same radius & layout of container
  gradient: {
    paddingHorizontal: 8, //update padding in default style padding set 12
  },
  image: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: 'gray',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 70,
  },
  title: {
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 14,
    color: '#333',
  },

  subText: {
    fontFamily: Font.IBMPlexSans_400Regular,
    fontSize: 12,
    color: '#333',
  },

  pointsContainer: {
    position: 'absolute',
    backgroundColor: '#f5e6e0',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 12,
    //paddingHorizontal: 16,
    paddingRight: 8,
    //paddingLeft: 16,
    //paddingVertical: 12,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    //marginRight: -8,
    //marginBottom: -22,
    // height: 60,
    width: 60,
    right: 0,
    bottom: 0,
  },
  // pointsTitle: {
  //   fontSize: 12,
  //   color: '#7b4b42',
  // },
  points: {
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 12,
    color: '#000',
    width: '100%',
    textAlign: 'right',
  },
  selectedText: { color: '#FFFFFF' },
  badge: {
    position: 'absolute',
    backgroundColor: '#FF7E65',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    right: 0,
    top: 0,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 10,
  },
});

export default memo(TaskListCard);
