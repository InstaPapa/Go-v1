import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Animated,
  Easing 
} from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Run } from '@/app/data/runData';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export type RunCardProps = {
  run: Run;
  onPress: () => void;
  index?: number;
};

export const RunCard = ({ run, onPress, index }: RunCardProps) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Анимация появления с задержкой в зависимости от индекса
    Animated.sequence([
      Animated.delay(index !== undefined ? index * 100 : 0),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedTouchable
      style={[
        styles.runCard,
        {
          transform: [
            { scale: scaleAnim },
            { translateY: translateYAnim }
          ],
          opacity: opacityAnim
        }
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#fff', '#f8f9fa']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Верхняя часть с датой и иконкой */}
        <View style={styles.runHeader}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={16} color="#ff6b6b" />
            <Text style={styles.runDate}>{run.date}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name="time" size={16} color="#ff6b6b" />
            <Text style={styles.runTime}>{run.time}</Text>
          </View>
        </View>

        {/* Основная статистика */}
        <View style={styles.runStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{run.distance}</Text>
            <Text style={styles.statLabel}>км</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{run.pace}</Text>
            <Text style={styles.statLabel}>темп</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{run.duration}</Text>
            <Text style={styles.statLabel}>время</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{run.calories}</Text>
            <Text style={styles.statLabel}>ккал</Text>
          </View>
        </View>

        {/* Нижняя часть с дополнительной информацией */}
        <View style={styles.footer}>
          <View style={styles.weatherInfo}>
            <Ionicons name="partly-sunny" size={16} color="#666" />
            <Text style={styles.weatherText}>{run.weather.temperature}°C, {run.weather.condition}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </View>
      </LinearGradient>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  runCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    
  },
  gradient: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc', 
    borderRadius: 20
  },
  runHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  runDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 6,
  },
  runTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  runStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff6b6b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
});