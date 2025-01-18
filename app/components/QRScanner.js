import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';

const QRScanner = ({ onScan }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [flashEnabled, setFlashEnabled] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await requestCameraPermission();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, [requestCameraPermission]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    console.log('Scanned data:', data);
    Alert.alert('QR Code Scanned', data);
    onScan(data);
  };

  const toggleFlash = () => {
    setFlashEnabled(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.flashButton, flashEnabled && styles.flashButtonActive]} onPress={toggleFlash}>
        <Text style={styles.flashButtonText}>{flashEnabled ? 'Flash On' : 'Flash Off'}</Text>
      </TouchableOpacity>
      <View style={styles.scannerContainer}>
        <View style={styles.overlay}>
          <Text style={styles.instructionText}>Align QR code within the frame</Text>
        </View>
        <CameraView
          ref={setCameraRef}
          style={styles.camera}
          facing='back'
          onBarCodeScanned={handleBarCodeScanned}
          flashMode={flashEnabled ? 'on' : 'off'}
          barCodeScannerSettings={{
            // Optional: Specify barcode scanning configurations here (if needed)
            barCodeTypes: ['qr', 'ean13', 'ean8'],
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  scannerContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  instructionText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  camera: {
    width: '80%', // Adjusted width for better framing
    height: '70%', // Adjusted height for better framing
    borderWidth: 2,
    borderColor: 'white', // Border color for the camera view
    borderRadius: 10, // Rounded corners
  },
  flashButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  flashButtonActive: {
    backgroundColor: 'yellow', // Active background color
  },
  flashButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default QRScanner;
