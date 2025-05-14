import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { getRandomQuote } from '@/utils/quotes';
import Animated, { 
  FadeIn, 
  FadeOut,
  SlideInDown,
  ZoomIn,
  Easing
} from 'react-native-reanimated';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function StartPage() {
  const router = useRouter();
  const [quote, setQuote] = useState(getRandomQuote());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Первая загрузка
    setTimeout(() => {
      setLoading(false);
    }, 800);

    // Установка интервала для смены цитат
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 10000); // 10 секунд

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, []);

  return (
    <ImageBackground 
      source={require('@/assets/images/begun2.1.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']}
        style={styles.gradient}
      >
        <Animated.View 
          entering={SlideInDown.duration(600)}
          style={styles.headerContainer}
        >
          <Text style={styles.header}>Беговой трекер</Text>
          {loading ? (
            <Animated.View 
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(400)}
              style={styles.loaderContainer}
            >
              <Ionicons name="fitness" size={24} color="#e594eb" />
            </Animated.View>
          ) : (
            <Animated.Text 
              key={quote} // Это важно для анимации при изменении цитаты
              entering={FadeIn.duration(600)}
              exiting={FadeOut.duration(400)}
              style={styles.quoteText}
            >
              "{quote}"
            </Animated.Text>
          )}
        </Animated.View>

        <Animated.View 
          entering={ZoomIn.duration(800).delay(400).easing(Easing.out(Easing.exp))}
          style={styles.actionsContainer}
        >
            <Pressable style={styles.primaryButton}
              onPress= {() => router.push('/(app)/jogging')}>
              <Text style={styles.buttonText}>Начать пробежку</Text>
              <Ionicons name="play" size={20} color="#fff" />
            </Pressable>

          <Link href="/(modals)/run-description" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Маршруты</Text>
              <Ionicons name="stats-chart" size={20} color="#b030ac" />
            </Pressable>
          </Link>
        </Animated.View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    padding: 25,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 40,
    
  },
  header: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 20,
  },
  loaderContainer: {
    height: 30,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.9)',
    
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    maxWidth: '90%',
  },
  actionsContainer: {
    marginBottom: 50,
  },
  primaryButton: {
    backgroundColor: '#e594eb',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    borderColor: '#8a2586',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#b030ac',
  },
  secondaryButtonText: {
    color: '#b030ac',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
});