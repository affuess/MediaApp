import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { HomeScreenProps } from '../types/navigation';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Вітаємо у магазині!</Text>
        
        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={() => navigation.navigate('Shop')}
        >
          <Text style={styles.mainButtonText}>🛒 Відкрити БД Товарів</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainButton, styles.profileButton]} 
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.mainButtonText}>👤 Профіль / Токени</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  mainButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
  },
  profileButton: {
    backgroundColor: '#334155',
  },
  mainButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});