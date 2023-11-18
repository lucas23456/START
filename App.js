import React, { useState, useEffect } from "react";
import { firebase } from './config';
import { View } from 'react-native';

import Menu from './components/Menu';


import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from './src/Dashboard'
import Header from "./components/Header";

import HomeScreen from "./src/Screens/HomeScreen";
import AddJobScreen from "./src/Screens/AddJobScreen";
import JobDetailsScreen from "./src/Screens/JobDetailsScreen";
import ChatScreen from "./src/Screens/ChatScreen";
import UploadedJobs from "./src/Screens/UploadedJobs";
// import NotificationsScreen from "./src/Screens/NotificationsScreen";



const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [menuVisible, setMenuVisible] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name='' />,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: () => <Header name='' />,
          }}
        />
      </Stack.Navigator>
    )
  }
  
  return (
    <View style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerTitle: () => <Header name='' />,
              headerRight: () => (
                <TouchableOpacity onPress={toggleMenu}/>
              ),
            }}
          />
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerTitle: () => <Header name='' />,
              headerRight: () => (
                <TouchableOpacity onPress={toggleMenu}/>
              ),
            }}
          />
        <Stack.Screen
            name="AddJobScreen"
            component={AddJobScreen}
            options={{
              headerTitle: () => <Header name='' />,
              headerRight: () => (
                <TouchableOpacity onPress={toggleMenu}/>
              ),
            }}
          />
          <Stack.Screen
            name="JobDetailsScreen"
            component={JobDetailsScreen}
            options={{
              headerTitle: () => <Header name='' />,
              headerRight: () => (
                <TouchableOpacity onPress={toggleMenu}/>
              ),
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              headerTitle: () => <Header name='' />,
              headerRight: () => (
                <TouchableOpacity onPress={toggleMenu}/>
              ),
            }}
          />
          <Stack.Screen
            name="UploadedJobs"
            component={UploadedJobs}
            options={{
              headerTitle: () => <Header name='' />,
              headerRight: () => (
                <TouchableOpacity onPress={toggleMenu}/>
              ),
            }}
          />     
          {/* <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
            options={{
              headerTitle: () => <Header name='' />,
              headerRight: () => (
                <TouchableOpacity onPress={toggleMenu}/>
              ),
            }}
          />          */}
        </Stack.Navigator>
      {menuVisible && <Menu />}
    </View>
  )
}

export default () => {
  return (
      <NavigationContainer>
        <App />
      </NavigationContainer>
  );
};