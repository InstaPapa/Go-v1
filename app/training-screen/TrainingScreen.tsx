/*import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TrainingScreen() {
    const router = useRouter();
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
        // Здесь можно добавить логику обновления дистанции
        setDistance(prev => prev + 0.01); // Примерное значение
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const saveWorkout = () => {
    const workout = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      distance: distance.toFixed(2),
      time: `${Math.floor(time/60)}:${(time%60).toString().padStart(2, '0')}`,
      pace: (time/distance).toFixed(2)
    };
    return workout;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.metric}>Дистанция: {distance.toFixed(2)} км</Text>
      <Text style={styles.metric}>Время: {Math.floor(time/60)}:{(time%60).toString().padStart(2, '0')}</Text>
      <Text style={styles.metric}>Темп: {(time/distance).toFixed(2)} мин/км</Text>
      
      <View style={styles.buttons}>
        <Button 
          title={isRunning ? "Пауза" : "Старт"} 
          onPress={() => setIsRunning(!isRunning)}
        />
        <Button 
          title="Завершить" 
          onPress={() => {
            const workout = saveWorkout();
            // Здесь будет сохранение тренировки
            router.back();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  metric: {
    fontSize: 24,
    margin: 10
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20
  }
});*/