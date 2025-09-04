import { Stack } from 'expo-router';

export default function RecommendedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTransparent: true, title: '' }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          //presentation: 'modal',
          headerShown: false,
          headerTransparent: false,
          //headerTitle: '',
          //headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="plan-details"
        options={{
          //presentation: 'modal',
          headerShown: false,
          headerTransparent: false,
          //headerTitle: '',
          //headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
//
