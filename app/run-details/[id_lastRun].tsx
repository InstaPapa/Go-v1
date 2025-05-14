import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  FlatList,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Run, runData } from '@/app/data/runData';
import { useEffect, useRef } from 'react';

export default function RunDetailsPage() {
  const router = useRouter();
  const screenHeight = Dimensions.get('window').height;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const calculateMapRegion = () => {
    let minLat = runData.route[0].latitude;
    let maxLat = runData.route[0].latitude;
    let minLng = runData.route[0].longitude;
    let maxLng = runData.route[0].longitude;

    runData.route.forEach(point => {
      minLat = Math.min(minLat, point.latitude);
      maxLat = Math.max(maxLat, point.latitude);
      minLng = Math.min(minLng, point.longitude);
      maxLng = Math.max(maxLng, point.longitude);
    });

    const padding = 0.02;

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: (maxLat - minLat) + padding,
      longitudeDelta: (maxLng - minLng) + padding,
    };
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header с градиентом */}
      <LinearGradient
        colors={['#fff', '#fff']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Вторник - Дневная пробежка</Text>
        <MaterialIcons name="more-vert" size={24} color="#fff" />
      </LinearGradient>

<ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >

      {/* Карта с анимированными маркерами */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={calculateMapRegion()}
          scrollEnabled={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          loadingEnabled={true}
          loadingIndicatorColor="#ff6b6b"
          loadingBackgroundColor="#f8f9fa"
        >
          <Polyline
            coordinates={runData.route}
            strokeColor="#ff6b6b"
            strokeWidth={6}
            lineDashPattern={[1]}
          />
          <Marker coordinate={runData.route[0]}>
            <Animated.View style={[styles.markerStart, styles.pulseAnimation]}>
              <MaterialIcons name="flag" size={24} color="#fff" />
            </Animated.View>
          </Marker>
          <Marker coordinate={runData.route[runData.route.length - 1]}>
            <Animated.View style={[styles.markerEnd, styles.pulseAnimation]}>
              <MaterialIcons name="flag" size={24} color="#fff" />
            </Animated.View>
          </Marker>
        </MapView>
      </View>

      
        {/* Статистика с иконками */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="speedometer" size={28} color="#ff6b6b" />
            <Text style={styles.statValue}>{runData.distance}</Text>
            <Text style={styles.statLabel}>Километров</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="timer" size={28} color="#4ECDC4" />
            <Text style={styles.statValue}>{runData.pace}</Text>
            <Text style={styles.statLabel}>Темп</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="time" size={28} color="#FFB347" />
            <Text style={styles.statValue}>{runData.duration}</Text>
            <Text style={styles.statLabel}>Время</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="flame" size={28} color="#A78BFA" />
            <Text style={styles.statValue}>{runData.calories}</Text>
            <Text style={styles.statLabel}>Калории</Text>
          </View>
        </View>

        {/* Детали с иконками */}
        <View style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={22} color="#666" />
            <View>
              <Text style={styles.detailLabel}>Дата и время</Text>
              <Text style={styles.detailText}>{runData.date} в {runData.time}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="partly-sunny" size={22} color="#666" />
            <View>
              <Text style={styles.detailLabel}>Погодные условия</Text>
              <Text style={styles.detailText}>
                {runData.weather.condition}, {runData.weather.temperature}°C
              </Text>
            </View>
          </View>
        </View>

        {/* Темп по километрам */}
        <View style={styles.splitsCard}>
          <Text style={styles.cardTitle}>Темп по километрам</Text>
          
          <View style={styles.splitHeader}>
            <Text style={styles.splitHeaderText}>КМ</Text>
            <Text style={styles.splitHeaderText}>ВРЕМЯ</Text>
            <Text style={styles.splitHeaderText}>ТЕМП</Text>
          </View>
          
          <FlatList
            data={runData.splits}
            renderItem={({ item }) => (
              <View style={styles.splitRow}>
                <Text style={styles.splitText}>{item.km}</Text>
                <Text style={styles.splitText}>{item.time}</Text>
                <Text style={[
                  styles.splitText,
                  item.pace === '4:50' && styles.fastPace,
                  item.pace === '6:10' && styles.slowPace
                ]}>
                  {item.pace}
                </Text>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    width: '100%',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
    borderBottomWidth: 1,
                    borderBottomColor: '#black',
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#black',
    textAlign: 'center',
    flex: 1,
  },
  mapContainer: {
  height: Dimensions.get('window').height * 0.4,
  width: '95%',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  borderRadius: 36,
  marginTop: -10,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 5,
  borderWidth: 1,
  borderColor: '#ccc',
  marginBottom: 20,
  
},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  markerStart: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  markerEnd: {
    backgroundColor: '#F44336',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  pulseAnimation: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginLeft: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  splitsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  splitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  splitHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  splitText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
  },
  fastPace: {
    color: '#4CAF50',
    fontWeight: '700',
  },
  slowPace: {
    color: '#F44336',
    fontWeight: '700',
  },
});