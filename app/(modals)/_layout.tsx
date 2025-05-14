import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen 
      name="modal"
      options={{
        presentation: 'transparentModal',
        animation: 'fade',
        headerShown: false,
      }} />
      <Stack.Screen name="settings" options={{ title: 'Настройки' }} />
      <Stack.Screen name="awards" options={{ title: 'Достижения' }} />
      <Stack.Screen
      name="run-description"
      options={({ navigation, route }) => ({
        title: 'Достижения',
        headerShown: false, // добавить это свойство
      })}
/>
    </Stack>
  );
}
