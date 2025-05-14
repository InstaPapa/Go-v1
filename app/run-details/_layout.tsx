import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RunDetailsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#f8f9fa', // Фон как в основном приложении
          },
        }}
      >
        <Stack.Screen name="[id_lastRun]"  />
      </Stack>
    </View>
  );
}