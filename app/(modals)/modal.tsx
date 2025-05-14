import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import Animated, { SlideInUp, FadeIn } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { achievements } from '@/app/data/achievements'; // Или правильный относительный путь

export default function ProfileModal() {
  // Фильтруем только полученные ачивки
  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <Animated.View
      entering={SlideInUp.duration(400)}
      style={styles.backdrop}
    >
      {/* Кликабельный фон для закрытия */}
      <Link href=".." asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>

      <Animated.View 
        style={styles.modalContent}
        entering={FadeIn.delay(200).duration(300)}
      >
        {/* Шапка профиля */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Роза Бегунова</Text>
          <Text style={styles.userStats}>Пробег: 156 км | 28 тренировок</Text>
        </View>

        {/* Разделы профиля */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Достижения</Text>
          
          {earnedAchievements.length > 0 ? (
            <View style={styles.badgesContainer}>
              {earnedAchievements.map((item) => (
                <View key={item.id} style={styles.badge}>
                  <View style={[styles.badgeIcon, { backgroundColor: item.color }]}>
                    <MaterialIcons name={item.icon} size={20} color="white" />
                  </View>
                  <Text style={styles.badgeText}>{item.title}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Пока нет выполненных достижений</Text>
          )}

          <Link href="/awards" asChild>
            <Pressable style={styles.sectionLink}>
              <Text style={styles.sectionLinkText}>Все достижения →</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          <Link href="/settings" asChild>
            <Pressable style={styles.menuItem}>
              <Text>Редактировать профиль</Text>
            </Pressable>
          </Link>
          <Pressable style={styles.menuItem}>
            <Text>Выйти</Text>
          </Pressable>
        </View>

        {/* Кнопка закрытия */}
        <Link href=".." asChild>
          <Pressable style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Свернуть</Text>
          </Pressable>
        </Link>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000070',
  },
  modalContent: {
    height: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userStats: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
    marginBottom: 15,
  },
  badge: {
    alignItems: 'center',
    width: 80,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  badgeText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
  sectionLink: {
    alignSelf: 'flex-end',
  },
  sectionLinkText: {
    color: '#ff6b6b',
    fontWeight: '500',
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});