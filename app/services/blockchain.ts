export const fetchProductDetails = async (productId: string) => {
    console.log('Fetching details for productId:', productId);
  
    // Mocking API response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Organic Coffee Beans',
          batch: 'ABC123',
          status: 'Verified',
        });
      }, 2000);
    });
  };
  