import { StyleSheet, View, Pressable, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

type Props = {
  label?: string;
  theme?: 'primary' | 'signup' | 'profile';
  onPress?: () => void;
  style?: object;
  children?: React.ReactNode; 
};

export default function Button({ label, theme, onPress, style }: Props) {
  if (theme === 'primary') {
    return (
      <View style={[styles.buttonContainer, styles.primaryContainer, style]}>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={onPress}
          android_ripple={{ color: '#f0f0f0' }}
        >
          <AntDesign name="rocket1" size={24} color="black" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, styles.primaryLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if (theme === 'signup') {
    return (
      <View style={[styles.buttonContainer, styles.signupContainer, style]}>
        <Pressable
          style={[styles.button, styles.signupButton]}
          onPress={onPress}
          android_ripple={{ color: '#f0f0f0' }}
        >
          <AntDesign name="adduser" size={24} color="black" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, styles.signupLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if (theme === 'profile') {
    const [pressed, setPressed] = useState(false);

    return (
      <TouchableOpacity
        style={[
          styles.profileButton,
          style,
          pressed && { 
            opacity: 0.8,
            transform: [{ scale: 0.95 }]
          }
        ]}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        activeOpacity={0.7}
      >
        <Ionicons 
          name="person-circle-outline" 
          size={32} // Увеличенный размер иконки
          color="#333"
        />
      </TouchableOpacity>
    );
}

  // Дефолтная кнопка
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable 
        style={styles.button} 
        onPress={onPress}
        android_ripple={{ color: '#f0f0f0' }}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Базовые стили
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '500',
  },

  // Стили для primary
  primaryContainer: {
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 18,
  },
  primaryButton: {
    backgroundColor: '#fff',
  },
  primaryLabel: {
    color: '#25292e',
  },

  // Стили для signup
  signupContainer: {
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 18,
  },
  signupButton: {
    backgroundColor: '#fff',
  },
  signupLabel: {
    color: '#25292e',
  },

  profileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56, // Фиксированный размер для круга
    height: 56, // Фиксированный размер для круга
    borderRadius: 28, // Половина ширины/высоты для perfect circle
    borderWidth: 1.5,
    borderColor: '#ffd33d',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
});