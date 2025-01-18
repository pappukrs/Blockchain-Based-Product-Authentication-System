import { Tabs } from 'expo-router'
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Header from '@/components/Header'

const TabsLayout = () => {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: true,
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc' },
        tabBarActiveBackgroundColor: '#e0e0e0',
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          header: () => <Header />,
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />

        }} 
      />
      <Tabs.Screen 
        name="profile/index" 
        options={{ 
          title: 'Profile', 
          header: () => <Header />,
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="scanner" 
        options={{ 
          title: 'Scanner', 
          header: () => <Header />,
          tabBarIcon: ({ color }) => <Ionicons name="camera-outline" size={24} color={color} />
        }} 
      />
    </Tabs>
  )
}

export default TabsLayout


{/* <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Scanner" component={ScannerScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} /> */}