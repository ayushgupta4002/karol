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
const Tab = createBottomTabNavigator();

const NavigationScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
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
              <FontAwesome name="home" size={size} color={color}  />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="search" size={size} color={color}  />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddPostScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle"size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-sharp" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreen;
