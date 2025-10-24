import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet, Animated, Platform, Alert } from 'react-native'

// Example of how to integrate the permissions utility
// Uncomment the following line to use the permissions utility:
// import { requestNotificationPermission, checkNotificationPermission } from '../utils/permissions'

function Toast({ type = 'info', message, visible, onHide }) {
  const [opacity] = useState(new Animated.Value(0))
  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start(() => {
        const t = setTimeout(() => {
          Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(onHide)
        }, 1500)
        return () => clearTimeout(t)
      })
    }
  }, [visible])
  const bg = type === 'success' ? '#10b981' : type === 'danger' ? '#ef4444' : '#0ea5e9'
  return (
    <Animated.View style={[styles.toast, { backgroundColor: bg, opacity }]}> 
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  )
}

export default function NotificationsScreen() {
  const [banner, setBanner] = useState(null)
  const [toast, setToast] = useState({ visible: false, type: 'info', message: '' })
  const [permissionStatus, setPermissionStatus] = useState('unknown')

  // Example: Check permission on mount
  useEffect(() => {
    checkPermission()
  }, [])

  const checkPermission = async () => {
    // Uncomment to use the permissions utility:
    // const granted = await checkNotificationPermission()
    // setPermissionStatus(granted ? 'granted' : 'not granted')
    
    // For demo purposes without the utility:
    setPermissionStatus('Not checked yet')
  }

  const handleRequestPermission = async () => {
    // Uncomment to use the permissions utility:
    /*
    try {
      const granted = await requestNotificationPermission()
      if (granted) {
        setPermissionStatus('granted')
        Alert.alert('Success', 'Notification permission granted!')
      } else {
        setPermissionStatus('denied')
        Alert.alert('Permission Denied', 'Please enable notifications in settings.')
      }
    } catch (error) {
      console.error('Error requesting permission:', error)
      Alert.alert('Error', 'Failed to request notification permission')
    }
    */
    
    // For demo purposes:
    Alert.alert('Demo', 'To enable real permission requests, uncomment the imports and code in this file.')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>

      {/* Permission Section */}
      {Platform.OS === 'android' && (
        <View style={styles.permissionSection}>
          <Text style={styles.subheading}>Notification Permission</Text>
          <Text style={styles.permissionText}>
            Status: <Text style={styles.permissionStatus}>{permissionStatus}</Text>
          </Text>
          <Pressable 
            onPress={handleRequestPermission} 
            style={[styles.btn, { backgroundColor: '#8b5cf6' }]}
          >
            <Text style={styles.btnText}>Request Permission</Text>
          </Pressable>
          <Text style={styles.infoText}>
            On Android 13+, POST_NOTIFICATIONS permission is required
          </Text>
        </View>
      )}

      {banner && (
        <View style={[styles.banner, { backgroundColor: banner.color }]}> 
          <Text style={styles.bannerText}>{banner.text}</Text>
          <Pressable onPress={() => setBanner(null)}>
            <Text style={styles.bannerClose}>✕</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.subheading}>Alerts</Text>
      <View style={styles.row}>
        <Pressable onPress={() => setBanner({ color: '#0ea5e9', text: 'Info alert example' })} style={[styles.btn, { backgroundColor: '#0ea5e9' }]}> 
          <Text style={styles.btnText}>Info</Text>
        </Pressable>
        <Pressable onPress={() => setBanner({ color: '#10b981', text: 'Success alert example' })} style={[styles.btn, { backgroundColor: '#10b981' }]}> 
          <Text style={styles.btnText}>Success</Text>
        </Pressable>
        <Pressable onPress={() => setBanner({ color: '#ef4444', text: 'Danger alert example' })} style={[styles.btn, { backgroundColor: '#ef4444' }]}> 
          <Text style={styles.btnText}>Danger</Text>
        </Pressable>
      </View>

      <Text style={styles.subheading}>Toasts</Text>
      <View style={styles.row}>
        <Pressable onPress={() => setToast({ visible: true, type: 'info', message: 'Saved!' })} style={[styles.btn, { backgroundColor: '#0ea5e9' }]}> 
          <Text style={styles.btnText}>Show toast</Text>
        </Pressable>
      </View>

      <Toast
        type={toast.type}
        message={toast.message}
        visible={toast.visible}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  subheading: { fontSize: 16, fontWeight: '700', marginVertical: 8 },
  permissionSection: { 
    backgroundColor: '#f3f4f6', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12 
  },
  permissionText: { fontSize: 14, marginBottom: 8, color: '#374151' },
  permissionStatus: { fontWeight: '700', color: '#6366f1' },
  infoText: { 
    fontSize: 12, 
    color: '#6b7280', 
    fontStyle: 'italic', 
    marginTop: 8 
  },
  banner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 8, marginBottom: 12,
  },
  bannerText: { color: 'white', fontWeight: '600' },
  bannerClose: { color: 'white', fontWeight: '800', fontSize: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  btn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
  btnText: { color: 'white', fontWeight: '700' },
  toast: { position: 'absolute', bottom: 24, left: 16, right: 16, padding: 12, borderRadius: 8 },
  toastText: { color: 'white', textAlign: 'center', fontWeight: '700' },
})
