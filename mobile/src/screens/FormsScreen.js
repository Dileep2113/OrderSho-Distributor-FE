import React, { useState } from 'react'
import { View, Text, TextInput, Switch, Pressable, StyleSheet } from 'react-native'

export default function FormsScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [role, setRole] = useState('Admin')

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forms</Text>
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <View style={styles.row}> 
        <Text style={styles.label}>Remember me</Text>
        <Switch value={remember} onValueChange={setRemember} />
      </View>

      <Text style={styles.subheading}>Role</Text>
      <View style={styles.segment}>
        {['Admin', 'Editor', 'Viewer'].map((r) => (
          <Pressable key={r} onPress={() => setRole(r)} style={[styles.segmentItem, role === r && styles.segmentActive]}> 
            <Text style={[styles.segmentText, role === r && styles.segmentTextActive]}>{r}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.submit} onPress={() => {}}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  subheading: { fontSize: 16, fontWeight: '700', marginVertical: 8 },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  label: { fontSize: 16 },
  segment: { flexDirection: 'row', backgroundColor: '#f3f4f6', padding: 4, borderRadius: 8, gap: 6 },
  segmentItem: { flex: 1, paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  segmentActive: { backgroundColor: 'white' },
  segmentText: { color: '#6b7280', fontWeight: '600' },
  segmentTextActive: { color: '#111827' },
  submit: { marginTop: 16, backgroundColor: '#0ea5e9', padding: 14, borderRadius: 8, alignItems: 'center' },
  submitText: { color: 'white', fontWeight: '700' },
})
