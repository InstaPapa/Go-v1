import { FlatList, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { achievements } from '@/app/data/achievements'; 

export default function ProfileAwards() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Мои достижения</Text>
      
      <FlatList
        data={achievements}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[
            styles.awardCard,
            !item.earned && styles.lockedAward
          ]}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <MaterialIcons 
                name={item.icon} 
                size={24} 
                color="white" 
              />
            </View>
            
            <View style={styles.textContainer}>
              <Text style={styles.awardTitle}>{item.title}</Text>
              <Text style={styles.awardDescription}>{item.description}</Text>
            </View>
            
            {item.earned ? (
              <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            ) : (
              <MaterialIcons name="lock" size={24} color="#9E9E9E" />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  awardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedAward: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  awardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  awardDescription: {
    fontSize: 14,
    color: '#666',
  },
});