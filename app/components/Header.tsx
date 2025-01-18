import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      
      <View style={styles.iconContainer}>
        <Ionicons name="menu" size={24} color="black" />
        <Ionicons name="notifications" size={24} color="black" />
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