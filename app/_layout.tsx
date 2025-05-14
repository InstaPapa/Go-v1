import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)" options={{ headerShown: false }} />
      <Stack.Screen name="run-details" options={{ headerShown: false }} />
      <Stack.Screen name="plan-details" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/modal"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
