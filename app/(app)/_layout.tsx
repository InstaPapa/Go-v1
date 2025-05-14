import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Button from "@/components/Button";


export default function TabLayout() {
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ff6b6b',
                tabBarInactiveTintColor: '#888',
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    fontSize: 30,
                    color: '#333',
                    includeFontPadding: false,
                    marginBottom: -5,
                },
                headerStyle: {
                    backgroundColor: '#fff0f5',
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 100,
                    borderBottomWidth: 1,
                    borderBottomColor: '#black',
                },
                
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
                tabBarStyle: {
                    backgroundColor: '#fff0f5',
                    borderTopWidth: 1,
                    borderTopColor: '#f0f0f0',
                    height: 80,
                    paddingBottom: 5,
                },
                headerRight: () => (
                    <View style={styles.headerRightContainer}>
                        <Button
                            theme="profile"
                            onPress={() => router.push('/(modals)/modal')}
                            style={styles.profileButton}
                        />
                    </View>
                )
            }}
        >
            <Tabs.Screen 
                name="home" 
                options={{ 
                    title: "Главная",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={24} color={color} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="plans" 
                options={{ 
                    title: "Планы",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="calendar-outline" size={24} color={color} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="jogging" 
                options={{ 
                    title: "Бег",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="walk-outline" size={24} color={color} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="activity" 
                options={{ 
                    title: "Активность",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="stats-chart-outline" size={24} color={color} />
                    )
                }} 
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    headerRightContainer: {
        marginRight: 15,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
});
