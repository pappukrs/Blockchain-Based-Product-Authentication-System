import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRScanner from '../../../components/QRScanner';
import { router } from 'expo-router';



const index: React.FC = () => {

  const handleScan = (data: string) => {
    router.push({
      pathname: '/product',
      params: { productId:1 }
    });
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

export default index;
