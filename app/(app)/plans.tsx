import { 
    Text, 
    View, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    Animated,
    Easing 
} from 'react-native';
import { useRouter } from 'expo-router';
import { runningPlans, RunningPlan } from '@/app/data/runningPlans';
import { useEffect, useRef } from 'react';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function PlansPage() {
    const router = useRouter();
    
    const cardAnimations = useRef(
        runningPlans.map(() => ({
            translateX: new Animated.Value(-300),
            opacity: new Animated.Value(0),
            scale: new Animated.Value(1)
        }))
    ).current;

    useEffect(() => {
        cardAnimations.forEach((anim, index) => {
            Animated.sequence([
                Animated.delay(index * 100),
                Animated.parallel([
                    Animated.timing(anim.translateX, {
                        toValue: 0,
                        duration: 500,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim.opacity, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true,
                    })
                ])
            ]).start();
        });
    }, []);

    const handlePressIn = (index: number) => {
        Animated.spring(cardAnimations[index].scale, {
            toValue: 0.98,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = (index: number) => {
        Animated.spring(cardAnimations[index].scale, {
            toValue: 1,
            friction: 6,
            useNativeDriver: true,
        }).start();
    };

    const renderPlanItem = ({ item, index }: { item: RunningPlan; index: number }) => (
        <AnimatedTouchable
            style={[
                styles.planItem,
                {
                    opacity: cardAnimations[index].opacity,
                    backgroundColor: item.color, // Используем цвет из данных
                    transform: [
                        { translateX: cardAnimations[index].translateX },
                        { scale: cardAnimations[index].scale }
                    ],
                    borderColor: getBorderColor(item.level) // Добавляем границу в зависимости от уровня
                }
            ]}
            onPressIn={() => handlePressIn(index)}
            onPressOut={() => handlePressOut(index)}
            onPress={() => router.push({
                pathname: "/plan-details/[id]",
                params: { id: item.id }
            })}
            activeOpacity={0.9}
        >
            <View style={styles.planHeader}>
                <Text style={styles.planTitle}>{item.title}</Text>
                <Text style={[styles.planLevel, { color: getLevelColor(item.level) }]}>
                    {item.level}
                </Text>
            </View>
            <Text style={styles.planDescription}>{item.description}</Text>
            <Text style={styles.planDuration}>Длительность: {item.duration} недель</Text>
        </AnimatedTouchable>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={runningPlans}
                renderItem={renderPlanItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

// Функция для определения цвета границы по уровню сложности
const getBorderColor = (level: string) => {
    switch(level) {
        case 'Легкий': return '#4CAF50'; // Зеленый
        case 'Средний': return '#FFC107'; // Желтый
        case 'Сложный': return '#F44336'; // Красный
        default: return '#eee';
    }
};

// Функция для определения цвета текста уровня
const getLevelColor = (level: string) => {
    switch(level) {
        case 'Легкий': return '#2E7D32'; // Темно-зеленый
        case 'Средний': return '#FF8F00'; // Оранжевый
        case 'Сложный': return '#C62828'; // Темно-красный
        default: return '#ff6b6b';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    listContainer: {
        padding: 15,
    },
    planItem: {
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 2, // Увеличиваем толщину границы
        height: 280,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    planLevel: {
        fontSize: 16,
        fontWeight: '600',
    },
    planDescription: {
        fontSize: 16,
        color: '#444',
        marginBottom: 12,
        lineHeight: 22,
    },
    planDuration: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
    },
});