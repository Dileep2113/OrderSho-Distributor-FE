import React from 'react'
import { View, Text, StyleSheet, Linking } from 'react-native'

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About</Text>
      <Text style={styles.p}>
        CoreUI Mobile is a lightweight React Native app inspired by the CoreUI React Admin Template. It includes a
        dashboard, users list, and settings with light/dark mode.
      </Text>
      <Text style={[styles.p, { color: '#0ea5e9' }]} onPress={() => Linking.openURL('https://coreui.io')}>
        https://coreui.io
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  p: { fontSize: 16, color: '#374151', marginBottom: 10 },
})
