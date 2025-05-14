import { useState, useEffect, useRef } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import DistanceModal from '@/app/(modals)/DistanceModal';
import { MaterialIcons } from '@expo/vector-icons';

export default function JoggingPage() {
    const router = useRouter();
    const [distance, setDistance] = useState('5.00');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tempDistance, setTempDistance] = useState(distance);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [workouts, setWorkouts] = useState([]);
    
    
    // Анимационные значения
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const colorAnim = useRef(new Animated.Value(0)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;
            
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();

        // Анимация появления
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // Анимация цвета
        Animated.loop(
            Animated.sequence([
                Animated.timing(colorAnim, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(colorAnim, {
                    toValue: 0,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ])
        ).start();

        // Анимация дрожания
        Animated.loop(
            Animated.sequence([
                Animated.timing(shakeAnim, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: -1,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: 0,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
            ])
        ).start();
    }, []);

    const colorInterpolation = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#FF6B6B', '#4ECDC4']
    });

    const shakeInterpolation = shakeAnim.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-2deg', '0deg', '2deg']
    });

    const handleSaveDistance = () => {
        const formattedDistance = parseFloat(tempDistance).toFixed(2);
        setDistance(formattedDistance);
        setIsModalVisible(false);
    };

    const handleDistanceChange = (text: string) => {
        if (/^\d*\.?\d{0,2}$/.test(text) || text === '') {
            setTempDistance(text);
        }
    };

    return (
        <View style={styles.container}>
            {/* Анимированный заголовок */}
            <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
                <Animated.Text 
                    style={[
                        styles.readyText,
                        {
                            transform: [
                                { rotate: shakeInterpolation },
                                { scale: 1.05 }
                            ],
                            fontSize: 48,
                            fontWeight: '800',
                            fontFamily: 'System',
                            letterSpacing: 1.2,
                            textAlign: 'center',
                            marginVertical: 10,
                            textShadowColor: 'rgba(0,0,0,0.3)',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 2,
                        }
                    ]}
                >
                    Уже готов?
                </Animated.Text>
            </Animated.View>

            {/* Карта с круглым вырезом */}
            <View style={styles.mapContainer}>
                {location && (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                    >
                        <Circle
                            center={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            radius={50}
                            fillColor="rgba(255,255,255,0.5)"
                            strokeColor="#eebef1"
                            strokeWidth={2}
                        />
                    </MapView>
                )}
                <View style={styles.mapOverlay} />
            </View>

            {/* Блок с дистанцией */}
            <TouchableOpacity 
                style={styles.distanceContainer}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.distanceValue}>{distance}</Text>
                <View style={styles.distanceDivider} />
                <Text style={styles.distanceUnit}>КМ</Text>
            </TouchableOpacity>

            {/* Кнопки */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                    style={styles.settingsButton}
                    onPress={() => console.log('Settings pressed')}
                >
                    <MaterialIcons name="settings" size={24} color="#333" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.startButton}
                    onPress={() => console.log('Start pressed')}
                >
                    
                    <Text style={styles.startButtonText}>Старт</Text>
                </TouchableOpacity>
                
                {/* Пустой View для выравнивания */}
                <View style={{ width: 50 }} />
            </View>

            <DistanceModal
                isVisible={isModalVisible}
                distance={tempDistance}
                onSave={handleSaveDistance}
                onDistanceChange={handleDistanceChange}
                onRequestClose={() => setIsModalVisible(false)}
            />
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    readyText: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        letterSpacing: 0.5,
    },
    mapContainer: {
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: width * 0.35,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 30,
        borderWidth: 2,
        borderColor: '#eebef1',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: width * 0.35,
        borderWidth: 15,
        borderColor: 'rgba(255,255,255,0.7)',
    },
    distanceContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    distanceValue: {
        fontSize: 68,
        fontWeight: '200',
        color: '#333',
    },
    distanceDivider: {
        width: 120,
        height: 2,
        backgroundColor: '#333',
        marginVertical: 5,
    },
    distanceUnit: {
        fontSize: 20,
        color: '#888',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: 20,
        marginBottom: 20,
    },
    settingsButton: {
        backgroundColor: '#eebef1',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#906bff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    startButton: {
        backgroundColor: '#eebef1',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 30,
        shadowColor: '#906bff',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    startButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});