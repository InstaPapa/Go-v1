import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen() {
  const router = useRouter();
  
  return (
    <LinearGradient
      colors={['#ffbdd3', '#fffafa']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image 
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>О нашем приложении</Text>
          </View>
          
          <Text style={styles.description}>
            Инновационное решение для вашего бизнеса и повседневной жизни.
            Простой интерфейс, мощные функции и надежная защита данных.
          </Text>
          
          <View style={styles.appPreview}>
            <Image 
              source={require('@/assets/images/begun3.jpg')}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>
          
          <Text style={styles.sectionTitle}>Основные возможности:</Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.bulletPoint}/>
              <Text style={styles.featureText}>Удобный интерфейс</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.bulletPoint}/>
              <Text style={styles.featureText}>Высокая производительность</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.bulletPoint}/>
              <Text style={styles.featureText}>Безопасное хранение данных</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.bulletPoint}/>
              <Text style={styles.featureText}>Синхронизация между устройствами</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/home')}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Создать аккаунт</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 40,
    borderRadius: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  title: {
    color: '#333',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: '#555',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  appPreview: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    marginBottom: 30,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b9d',
    marginRight: 12,
  },
  featureText: {
    color: '#444',
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
  },
  registerButton: {
    height: 56,
    borderRadius: 16,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#8a2be2',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#8a2be2',
  },
});
