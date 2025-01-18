import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchProductDetails } from '../../services/blockchain';

interface ProductScreenProps {
  route: {
    params: {
      productId: string;
    };
  };
}

const ProductScreen: React.FC<ProductScreenProps> = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchProductDetails(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {product ? (
        <>
          <Text style={styles.title}>Product Details</Text>
          <Text>Name: {product.name}</Text>
          <Text>Batch: {product.batch}</Text>
          <Text>Status: {product.status}</Text>
        </>
      ) : (
        <Text>No product details available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProductScreen;
