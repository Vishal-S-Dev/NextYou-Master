// ImagePickerBottomSheet.tsx
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export type ImagePickerBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  onImagePicked: (uri: string) => void;
};

const ImagePickerBottomSheet = forwardRef<ImagePickerBottomSheetRef, Props>(
  ({ onImagePicked }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.expand(),
      close: () => bottomSheetRef.current?.close(),
    }));

    const snapPoints = useMemo(() => ['30%'], []);

    const handlePick = useCallback(
      async (type: 'camera' | 'gallery') => {
        bottomSheetRef.current?.close();

        try {
          if (type === 'camera') {
            const { status } =
              await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission required', 'Camera access is needed.');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: false,
              quality: 1,
            });
            if (!result.canceled) {
              onImagePicked(result.assets[0].uri);
            }
          }

          if (type === 'gallery') {
            const { status } =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission required', 'Gallery access is needed.');
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: false,
              quality: 1,
            });
            if (!result.canceled) {
              onImagePicked(result.assets[0].uri);
            }
          }
        } catch (err) {
          console.error('Image Picker Error:', err);
        }
      },
      [onImagePicked]
    );

    return (
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        <BottomSheetView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 20, gap: 16 }}>
            <TouchableOpacity
              style={{
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ccc',
              }}
              onPress={() => handlePick('camera')}
            >
              <Text style={{ fontSize: 16 }}>📸 Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ccc',
              }}
              onPress={() => handlePick('gallery')}
            >
              <Text style={{ fontSize: 16 }}>🖼️ Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ccc',
                alignItems: 'center',
              }}
              onPress={() => bottomSheetRef.current?.close()}
            >
              <Text style={{ fontSize: 16, color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default ImagePickerBottomSheet;
