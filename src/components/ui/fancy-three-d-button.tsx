import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const Fancy3DButton = ({ title = '3D Button', onPress }: any) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => {
        setPressed(false);
        onPress?.();
      }}
      style={styles.wrapper}
    >
      <LinearGradient
        colors={pressed ? ['#2980b9', '#2c3e50'] : ['#6dd5fa', '#2980b9']}
        start={{ x: 0.1, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default Fancy3DButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    transform: [{ translateY: 4 }],
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    elevation: 4,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
