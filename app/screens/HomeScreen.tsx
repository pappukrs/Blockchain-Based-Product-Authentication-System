import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Welcome to VerifiChain</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Scanner' as never)}
      >
        <Text style={globalStyles.buttonText}>Start QR Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
