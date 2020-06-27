import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { withPauseWhenNotVisible } from "./withPauseWhenNotVisible";
import { FrequentlyUpdatinScreenContent } from "../components/FrequentlyUpdatingScreenContent";
import { RapidlyUpdatingContextProvider } from "../hooks/useRapidlyUpdatingContext";
import { View, Text } from "../components/Themed";
import { Button, ListView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

const TabOneScreen = withPauseWhenNotVisible(() => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <FrequentlyUpdatinScreenContent label="Tab 1 - screen 1" />
      <Button
        title="go to screen 2"
        onPress={() => {
          navigation.navigate("TabOneScreenTwo");
        }}
      >
        Go to screen 2
      </Button>
    </ScrollView>
  );
}, "Tab 1 screen");

const TabOneScreenTwo = withPauseWhenNotVisible(() => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <FrequentlyUpdatinScreenContent label="Tab 1 - screen 2" />
      <Button
        title="go to back"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go back
      </Button>
    </ScrollView>
  );
}, "Tab 1 screen 2");

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
      <TabOneStack.Screen
        name="TabOneScreenTwo"
        component={TabOneScreenTwo}
        options={{ headerTitle: "Tab One Screen Two Title" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();
const TabTwoScreen = withPauseWhenNotVisible(
  () => <FrequentlyUpdatinScreenContent label="Tab 2" />,
  "Tab 2"
);

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}
