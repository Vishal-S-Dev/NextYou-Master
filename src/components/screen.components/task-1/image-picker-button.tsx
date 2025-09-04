import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  imageUri: string | null;
  // setImageUri: (uri: string | null) => void;
  pickImage: () => void;
};

export default function ImagePickerButton({ imageUri, pickImage }: Props) {
  // const pickImage = async () => {
  //   // Request media library permissions
  //   const { status: libStatus } =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (libStatus !== 'granted') {
  //     Alert.alert(
  //       'Permission required',
  //       'We need access to your photos to continue.'
  //     );
  //     return;
  //   }

  //   // Request camera permissions (if you allow taking photos too)
  //   const { status: camStatus } =
  //     await ImagePicker.requestCameraPermissionsAsync();
  //   if (camStatus !== 'granted') {
  //     Alert.alert(
  //       'Permission required',
  //       'We need access to your camera to continue.'
  //     );
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: false,
  //     quality: 0.6,
  //   });
  //   if (!result.canceled && result.assets.length > 0) {
  //     setImageUri(result.assets[0].uri);
  //   }
  // };

  return (
    <Pressable style={styles.button} onPress={pickImage}>
      <View style={styles.inner}>
        <FontAwesome name="check" size={24} color="#EB8468" />
        <Text style={styles.text}>Click picture of 1 L water taken</Text>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    flex: 1,
    color: '#333',
    fontWeight: '600',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
});
