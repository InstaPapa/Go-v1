import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { useState } from 'react';
import {stats, chartData} from '@/app/data/statisticsActivity';
import {Run, runData} from '@/app/data/runData';
import {RunCard, RunCardProps} from '@/components/RunCard';

export default function ActivityPage() {
    const router = useRouter();
    const screenWidth = Dimensions.get('window').width;
    const periods = ['Неделя', 'Месяц', 'Год', 'Все время'];
    const [activePeriod, setActivePeriod] = useState(periods[0]);

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Фильтры по времени */}
            <View style={styles.periodContainer}>
                {periods.map((period) => (
                    <TouchableOpacity
                        key={period}
                        style={[
                            styles.periodButton,
                            activePeriod === period && styles.activePeriodButton
                        ]}
                        onPress={() => setActivePeriod(period)}
                    >
                        <Text style={[
                            styles.periodText,
                            activePeriod === period && styles.activePeriodText
                        ]}>
                            {period}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            {/* Основная статистика */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{stats.totalDistance} км</Text>
                    <Text style={styles.statLabel}>Общее расстояние</Text>
                </View>
                
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{stats.totalRuns}</Text>
                    <Text style={styles.statLabel}>Пробежек</Text>
                </View>
                
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{stats.averagePace}</Text>
                    <Text style={styles.statLabel}>Средний темп</Text>
                </View>
                
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{stats.averageDuration}</Text>
                    <Text style={styles.statLabel}>Среднее время</Text>
                </View>
            </View>
            
            {/* Диаграмма */}
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Пробежки за неделю</Text>
                <BarChart
                    data={chartData}
                    width={screenWidth - 40}
                    height={220}
                    yAxisSuffix=" км"
                    yAxisLabel=""
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '4',
                            strokeWidth: '2',
                            stroke: '#ff6b6b',
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>
            
            {/* Последние активности */}
            <View style={styles.activitiesContainer}>
                <Text style={styles.sectionTitle}>Последние пробежки</Text>
                <FlatList
                    data={[runData]}
                    renderItem={({ item }) => (
                        <RunCard 
                            run={item} 
                            onPress={() => router.push(`/run-details/[id_lastRun]`)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false} // Отключаем скролл для FlatList
                    contentContainerStyle={styles.activitiesList}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    periodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    periodButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    activePeriodButton: {
        backgroundColor: '#ff6b6b',
    },
    periodText: {
        color: '#666',
        fontWeight: '500',
    },
    activePeriodText: {
        color: '#fff',
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    chartContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    activitiesContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
    },
    activitiesList: {
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
});