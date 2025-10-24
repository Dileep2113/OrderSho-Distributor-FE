import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { 
  requestNotificationPermission, 
  checkNotificationPermission,
  RESULTS,
  PermissionStatus
} from '../utils/permissions';

/**
 * Example component demonstrating POST_NOTIFICATIONS permission usage
 * This shows how to properly request and check notification permissions on Android 13+
 */
export default function NotificationPermissionExample() {
  const [permissionStatus, setPermissionStatus] = useState<string>('unknown');
  const [isGranted, setIsGranted] = useState<boolean>(false);

  useEffect(() => {
    checkCurrentPermission();
  }, []);

  const checkCurrentPermission = async () => {
    const granted = await checkNotificationPermission();
    setIsGranted(granted);
    setPermissionStatus(granted ? 'granted' : 'not granted');
  };

  const handleRequestPermission = async () => {
    try {
      const granted = await requestNotificationPermission();
      
      if (granted) {
        setIsGranted(true);
        setPermissionStatus('granted');
        Alert.alert('Success', 'Notification permission granted!');
      } else {
        setIsGranted(false);
        setPermissionStatus('denied');
        Alert.alert('Permission Denied', 'Notification permission was not granted.');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      Alert.alert('Error', 'Failed to request notification permission');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Permission</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.label}>Current Status:</Text>
        <Text style={[
          styles.status,
          { color: isGranted ? '#10b981' : '#ef4444' }
        ]}>
          {permissionStatus}
        </Text>
      </View>

      {Platform.OS === 'android' && (
        <Text style={styles.info}>
          POST_NOTIFICATIONS permission is required on Android 13+ (API level 33+)
        </Text>
      )}

      <Pressable 
        style={[styles.button, isGranted && styles.buttonDisabled]}
        onPress={handleRequestPermission}
        disabled={isGranted}
      >
        <Text style={styles.buttonText}>
          {isGranted ? 'Permission Granted ✓' : 'Request Permission'}
        </Text>
      </Pressable>

      <Pressable 
        style={[styles.button, styles.checkButton]}
        onPress={checkCurrentPermission}
      >
        <Text style={styles.buttonText}>Check Status</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    color: '#4b5563',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  checkButton: {
    backgroundColor: '#6b7280',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
