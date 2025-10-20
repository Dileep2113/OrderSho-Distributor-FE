import React from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const users = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : 'Member',
}))

export default function UsersScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => navigation.navigate('UserDetail', { user: item })}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.email}</Text>
            </View>
            <Text style={styles.role}>{item.role}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  sep: { height: 1, backgroundColor: '#e5e7eb' },
  row: { paddingVertical: 12, flexDirection: 'row', alignItems: 'center' },
  name: { fontWeight: '700' },
  meta: { color: '#6b7280' },
  role: { fontWeight: '600', color: '#0ea5e9' },
})
