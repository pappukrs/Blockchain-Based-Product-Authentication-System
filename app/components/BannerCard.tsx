import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient


const BannerCard: React.FC = () => {

  return (

    <LinearGradient
      colors={['#ff7e5f', '#feb47b']} // Define your gradient colors

      style={styles.banner}

    >

      <Text style={styles.bannerText}>Detect Fake Products Using Blockchain Technology!</Text>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({

  banner: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,

  },

  bannerText: {

    fontSize: 16,
    color: '#ffffff', // Change text color for better contrast
  },

});


export default BannerCard;