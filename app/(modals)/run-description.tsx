import { Pressable, View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';

export default function RunDescriptionModal() {
  return (
    <Animated.View 
      style={styles.container}
      entering={SlideInUp.duration(400)}
    >
      <Animated.View 
        style={styles.content}
        entering={FadeIn.delay(200)}
      >
        <Text style={styles.title}>Ночной забег по городу</Text>
        
        {/* Место для изображения */}
        <View style={styles.imagePlaceholder}>
          <Image
            source={require('@/assets/images/news-rout.png')} // Замените на ваш путь к изображению
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
        <Text style={styles.subtitle}>Маршрут "Огни ночного города"</Text>
        <Text style={styles.text}>
          Этот 5-километровый маршрут проведет вас по самым живописным местам города, 
          подсвеченным ночными огнями. Старт у Центральной площади, далее вдоль набережной 
          с видом на освещенные мосты, через исторический центр с его архитектурной 
          подсветкой и финиш у нового современного квартала.
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Дистанция:</Text>
            <Text style={styles.detailValue}>5.2 км</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Время:</Text>
            <Text style={styles.detailValue}>28:10</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Дата:</Text>
            <Text style={styles.detailValue}>15.05.2023</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Сложность:</Text>
            <Text style={[styles.detailValue, styles.easy]}>Легкая</Text>
          </View>
        </View>
        
        <Text style={styles.tip}>
          💡 Совет: Возьмите с собой светоотражающие элементы для безопасности!
        </Text>
        
        <Link href="../" asChild>
          <Pressable style={styles.closeButton}>
            <Text style={styles.closeText}>Закрыть</Text>
          </Pressable>
        </Link>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  content: {
    backgroundColor: '#1a1a1a',
    padding: 25,
    borderRadius: 20,
    width: '85%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff6b6b',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    color: '#e0e0e0',
    marginBottom: 20,
    lineHeight: 22,
  },
  imagePlaceholder: {
    height: 180,
    borderRadius: 12,
    backgroundColor: '#333',
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    backgroundColor: '#252525',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: '#aaa',
  },
  detailValue: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  easy: {
    color: '#4CAF50',
  },
  tip: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  closeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});