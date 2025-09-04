import { Stack } from 'expo-router';

export default function Task0Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTransparent: false,
          headerTitle: '',
          //headerBackTitleVisible: false,
          //headerTintColor: '#fff', // Or any color that fits your design
        }}
      />
    </Stack>
  );
}
//
