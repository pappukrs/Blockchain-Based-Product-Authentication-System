import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRScanner from '../../components/QRScanner';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Product: { productId: string };
};

const ScannerScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleScan = (data: string) => {
    navigation.navigate('Product', { productId: data });
  };

  return (
    <View style={styles.container}>
      <QRScanner onScan={handleScan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScannerScreen;
