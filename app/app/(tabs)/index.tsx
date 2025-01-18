import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LineChart } from 'react-native-chart-kit';
import BannerCard from '@/components/BannerCard';
import globalStyles from '../../styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity 0
  const [scaleAnim] = useState(new Animated.Value(0)); // Initial scale 0
  const [darkTheme, setDarkTheme] = useState(false); // Toggle theme

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, scaleAnim]);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  return (
    <LinearGradient
      colors={['#00c6ff', '#0072ff']}
      style={styles.gradientBackground}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: darkTheme ? '#121212' : '#ffffff' }]}
      >
        <StatusBar style={darkTheme ? 'light' : 'dark'} />

        <BannerCard />

        <Animated.View
          style={[styles.headerContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={[styles.title, { color: darkTheme ? '#fff' : '#333' }]}>
            Welcome to SupplyChainPro
          </Text>
        </Animated.View>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Detect Fake Products Using Blockchain Technology!
          </Text>
        </View>

        <View style={styles.stats}>
          <Text style={[styles.sectionTitle, { color: darkTheme ? '#fff' : '#333' }]}>
            Key Metrics
          </Text>
          <Animated.View
            style={[styles.kpiCard, { backgroundColor: darkTheme ? '#333' : '#f8f9fa' }]}
          >
            <Text style={[styles.kpiText, { color: darkTheme ? '#fff' : '#000' }]}>
              Verified Products: <Text style={styles.kpiValue}>1,245</Text>
            </Text>
            <Text style={[styles.kpiText, { color: darkTheme ? '#fff' : '#000' }]}>
              Efficiency Score: <Text style={styles.kpiValue}>95%</Text>
            </Text>
          </Animated.View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={[styles.chartTitle, { color: darkTheme ? '#fff' : '#000' }]}>
            Supply Chain Overview
          </Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [{ data: [20, 45, 28, 80, 99] }],
            }}
            width={320}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>

        <View style={styles.carousel}>
          <Text style={[styles.carouselTitle, { color: darkTheme ? '#fff' : '#000' }]}>
            Latest Articles
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.carouselCard}>
              <Text style={styles.carouselText}>Blockchain in Logistics</Text>
            </View>
            <View style={styles.carouselCard}>
              <Text style={styles.carouselText}>AI in Supply Chains</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.content}>
          <Text style={[styles.description, { color: darkTheme ? '#ccc' : '#333' }]}>
            SupplyChainPro streamlines logistics and verification processes. Scan a QR code to access real-time data.
          </Text>
          <TouchableOpacity
            style={[globalStyles.button, { backgroundColor: darkTheme ? '#444' : '#007bff' }]}
            onPress={() => navigation.navigate('Scanner' as never)}
          >
            <Text style={globalStyles.buttonText}>Begin QR Scan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pricingSection}>
          <Text style={[styles.sectionTitle, { color: darkTheme ? '#fff' : '#333' }]}>
            Pricing Plans
          </Text>
          <View style={styles.pricingCard}>
            <Text style={[styles.pricingTitle, { color: darkTheme ? '#fff' : '#000' }]}>
              Basic Plan
            </Text>
            <Text style={[styles.pricingPrice, { color: darkTheme ? '#fff' : '#333' }]}>
              $19.99/month
            </Text>
            <Text style={[styles.pricingDescription, { color: darkTheme ? '#ccc' : '#555' }]}>
              Access to basic features with limited analytics and support.
            </Text>
          </View>
          <View style={styles.pricingCard}>
            <Text style={[styles.pricingTitle, { color: darkTheme ? '#fff' : '#000' }]}>
              Premium Plan
            </Text>
            <Text style={[styles.pricingPrice, { color: darkTheme ? '#fff' : '#333' }]}>
              $49.99/month
            </Text>
            <Text style={[styles.pricingDescription, { color: darkTheme ? '#ccc' : '#555' }]}>
              Includes advanced analytics, real-time tracking, and priority support.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: darkTheme ? '#888' : '#333' }]}>
            Powered by VerifiChain Team
          </Text>
          <Switch value={darkTheme} onValueChange={toggleTheme} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#f8d7da',
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  bannerText: {
    fontSize: 16,
    color: '#721c24',
  },
  stats: {
    alignItems: 'center',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  kpiCard: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: '#4CAF50',
  },
  kpiText: {
    fontSize: 18,
  },
  kpiValue: {
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  carousel: {
    marginVertical: 15,
  },
  carouselTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  carouselCard: {
    backgroundColor: '#FFEB3B',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  carouselText: {
    fontSize: 16,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 15,
  },
  footerText: {
    fontSize: 12,
  },
  gradientBackground: {
    flex: 1,
  },
  pricingSection: {
    marginBottom: 25,
  },
  pricingCard: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pricingPrice: {
    fontSize: 20,
    marginVertical: 10,
  },
  pricingDescription: {
    fontSize: 14,
  },
});

export default HomeScreen;
