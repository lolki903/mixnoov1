import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback, createContext, useContext
} from 'react';
// import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { auth, firebaseConfig } from './config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';



import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Chat from './src/screens/Chat';
import Main from './src/Main';
import Chatprivate from './src/screens/Chatprivate';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function ChatStack() {
  return (
    <Tab.Navigator screenOptions={({route})=> ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Main') {
         // iconname est eqaul a home
          // iconName = focused ? 'home' : 'home-outline';
          iconName = focused ? 'arrow-up' : 'arrow-up-outline';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })}>
    <Tab.Screen name="Match" component={Main} />
    <Tab.Screen name="Chat" component={Chat} />
</Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
export default function App() {

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}