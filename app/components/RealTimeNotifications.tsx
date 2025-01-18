import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

interface Notification {
  type: string;
  message: string;
  details: string;
}

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      setNotifications(prev => [...prev, notification.request.content.data as Notification]);
      Alert.alert('New Notification', notification.request.content.data.message);
    });

    return () => subscription.remove();
  }, []);

  const handleDismiss = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  };

  const renderNotificationItem = ({ 
    item, 
    index 
  }: { 
    item: Notification; 
    index: number 
  }) => (
    <View style={[styles.alertBox, { backgroundColor: item.type === 'counterfeit' ? '#ff4d4d' : '#ffcc00' }]}>
      <Text style={styles.alertText}>{item.message}</Text>
      <TouchableOpacity onPress={() => Alert.alert("View Details", item.details)}>
        <Text style={styles.viewDetails}>View Details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDismiss(index)} style={styles.dismissButton}>
        <Text style={styles.dismissText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  alertBox: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  alertText: {
    fontSize: 16,
    color: '#fff',
  },
  viewDetails: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  dismissButton: {
    marginTop: 10,
  },
  dismissText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default RealTimeNotifications;
