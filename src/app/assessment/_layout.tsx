import { Stack } from 'expo-router';

export default function AssessmentLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="take-assessment"
        options={{ headerTransparent: true }}
      />
      {/* <Stack.Screen
        name="take-assessment"
        options={{ title: 'Take Assessment', headerTransparent: false }}
      /> */}
      {/* <Stack.Screen name="take-assessment" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
//
