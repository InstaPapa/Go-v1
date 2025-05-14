import { View, Text, Switch, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function ProfileSettings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text>Уведомления</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>

      <View style={styles.settingItem}>
        <Text>Тёмная тема</Text>
        <Switch /* ... */ />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});