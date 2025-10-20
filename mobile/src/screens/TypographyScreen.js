import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TypographyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Typography</Text>

      <Text style={styles.h1}>H1. Heading</Text>
      <Text style={styles.h2}>H2. Heading</Text>
      <Text style={styles.h3}>H3. Heading</Text>
      <Text style={styles.h4}>H4. Heading</Text>
      <Text style={styles.h5}>H5. Heading</Text>
      <Text style={styles.h6}>H6. Heading</Text>

      <Text style={styles.p}>
        This is a paragraph of text that demonstrates the default type scale. It supports multiple lines and wraps
        properly on mobile devices.
      </Text>
      <Text style={styles.muted}>Muted text example</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  h1: { fontSize: 32, fontWeight: '800', marginVertical: 4 },
  h2: { fontSize: 28, fontWeight: '800', marginVertical: 4 },
  h3: { fontSize: 24, fontWeight: '800', marginVertical: 4 },
  h4: { fontSize: 20, fontWeight: '700', marginVertical: 4 },
  h5: { fontSize: 18, fontWeight: '700', marginVertical: 4 },
  h6: { fontSize: 16, fontWeight: '700', marginVertical: 4 },
  p: { fontSize: 16, marginTop: 12, color: '#111827' },
  muted: { fontSize: 14, color: '#6b7280', marginTop: 8 },
})
