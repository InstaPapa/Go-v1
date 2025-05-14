import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#ff9494',
      headerStyle: {
        backgroundColor: '#ffbdd3',
      },
      headerShadowVisible: false,
      headerTintColor: '#black',
      tabBarStyle: {
      backgroundColor: '#fff',
      },
    }}
>
      <Tabs.Screen
        name="index"
        options={{
          title: '',

          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
