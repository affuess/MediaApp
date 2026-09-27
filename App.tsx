import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation'; 
import { HomeScreen } from './src/screens/HomeScreen';
import { MediaDetailScreen } from './src/screens/MediaDetailScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ShopScreen } from './src/screens/ShopScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#6366f1' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({ 
            title: 'Головна',
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Shop')}
                  style={{ marginRight: 15 }}
                >
                  <Text style={{ color: '#ffffff', fontWeight: '600' }}>Магазин</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Text style={{ color: '#ffffff', fontWeight: '600' }}>Профіль</Text>
                </TouchableOpacity>
              </View>
            ),
          })} 
        />
        <Stack.Screen name="Shop" component={ShopScreen} options={{ title: 'Магазин (БД)' }} />
        <Stack.Screen name="MediaDetail" component={MediaDetailScreen} options={{ title: 'Media View' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}