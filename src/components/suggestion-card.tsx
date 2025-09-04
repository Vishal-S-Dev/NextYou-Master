import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  imageSource: string;
  text: string;
}

const SuggestionCard: React.FC<Props> = ({ imageSource, text }) => {
  return (
    <View
      style={{
        marginTop: 20,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Image
        source={{
          uri: imageSource,
        }}
        style={styles.cardImage}
      />
      <View style={styles.infoOverlay}>
        <Text style={styles.text} numberOfLines={2}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },

  cardImage: {
    flex: 1,
  },

  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  text: {
    color: '#fff',
  },
});

export default SuggestionCard;
