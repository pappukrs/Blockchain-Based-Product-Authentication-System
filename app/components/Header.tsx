import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Header: React.FC = () => {
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push({
      pathname: '/notifications/index'
    });
  };

  return (
    <View style={styles.headerContainer}>
      
      <View style={styles.iconContainer}>
        <Ionicons name="menu" size={24} color="black" />
        <TouchableOpacity onPress={handleNotificationPress}>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default Header;