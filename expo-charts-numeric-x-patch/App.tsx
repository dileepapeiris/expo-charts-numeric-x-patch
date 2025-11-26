import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

import OfficialExamplesScreen from "./screens/OfficialExamplesScreen";
import NumericXAxisExamplesScreen from "./screens/NumericXAxisExamplesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#6366F1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarActiveTintColor: "#6366F1",
            tabBarInactiveTintColor: "#999",
          }}
        >
          <Tab.Screen
            name="Official"
            component={OfficialExamplesScreen}
            options={{
              tabBarLabel: "Official Examples",
              headerTitle: "Official Native Components",
            }}
          />
          <Tab.Screen
            name="Numeric"
            component={NumericXAxisExamplesScreen}
            options={{
              tabBarLabel: "Numeric X-Axis",
              headerTitle: "Numeric X-Axis Examples",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}
