import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ExploreScreen from "../screens/ExploreScreen";
import AddPostScreen from "../screens/AddPostScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreenNavigation from "./HomeScreenNavigation";
import { useAuth } from "../context/ContextAuth";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import Header from "../components/Header";
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const NavigationScreen = () => {
  const { auth } = useAuth();
  console.log(
    "NavigationScreen.tsx ~ line20~ authState log :" + auth.authState
  );
  return (
    <NavigationContainer>
      {auth?.authState != true ? (
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
           
            tabBarLabel: ({ color }) => (
              <Text
                style={{
                  color: color,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                {route.name}
              </Text>
            ),
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreenNavigation}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" size={size} color={color} />
              ),
              header:Header

            }}
          />
          <Tab.Screen
            name="Add"
            component={AddPostScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-sharp" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default NavigationScreen;
