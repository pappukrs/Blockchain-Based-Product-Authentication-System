import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

function HomeTab() {
  return (
    <View>
      <Text>Home Tab</Text>
    </View>
  );
}

function ProfileTab() {
  return (
    <View>
      <Text>Profile Tab</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomePage() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeTab} />
      <Tab.Screen name="ProfileTab" component={ProfileTab} />
    </Tab.Navigator>
  );
}
