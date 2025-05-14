import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { runningPlans, RunningPlan } from '@/app/data/runningPlans';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlanDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const plan = runningPlans.find(item => item.id === id);

  if (!plan) {
    return (
      <View style={styles.container}>
        <Text>План не найден</Text>
      </View>
    );
  }

  const handleStart = () => {
    // Здесь будет логика начала тренировки
    console.log(`Начали план: ${plan.title}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient
        colors={['#f7f9fc', '#e3f2fd']}
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{plan.title}</Text>
              <Text style={styles.level}>{plan.level}</Text>
            </View>
            <View style={styles.durationBadge}>
              <Text style={styles.durationBadgeText}>{plan.duration} недель</Text>
            </View>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.description}>{plan.description}</Text>
            
            {plan.details && (
              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>Детали плана</Text>
                <Text style={styles.details}>{plan.details}</Text>
              </View>
            )}

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3-5</Text>
                <Text style={styles.statLabel}>дней в неделю</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{plan.duration}</Text>
                <Text style={styles.statLabel}>недель</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>20-40</Text>
                <Text style={styles.statLabel}>мин/день</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <TouchableOpacity 
        style={styles.startButton}
        onPress={handleStart}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#4e54c8', '#8f94fb']}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.startButtonText}>Начать пробежку</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  gradientBackground: {
    flex: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    marginTop: 45,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 5,
  },
  level: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  durationBadge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  durationBadgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 25,
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 10,
  },
  details: {
    fontSize: 15,
    lineHeight: 22,
    color: '#7f8c8d',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3498db',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
  },
  startButton: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});