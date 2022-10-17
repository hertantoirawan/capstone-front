/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import NotFoundScreen from "../screens/NotFoundScreen";
import ApplicationsScreen from "../screens/ApplicationsScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ResumeScreen from "../screens/ResumeScreen";
import NewResumeScreen from "../screens/NewResumeScreen";
import ReviewNewResumeScreen from "../screens/ReviewNewResumeScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import ProjectDetailsScreen from "../screens/ProjectDetailsScreen";
import WorkExperienceScreen from "../screens/WorkExperienceScreen";
import EducationScreen from "../screens/EducationScreen";

import SettingsModalScreen from "../screens/SettingsModalScreen";
import ApplicationModalScreen from "../screens/ApplicationModalScreen";
import ApplyModalScreen from "../screens/ApplyModalScreen";
import AddWorkModalScreen from "../screens/AddWorkModalScreen";
import AddEducationModalScreen from "../screens/AddEducationModalScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import AuthProvider from "../hooks/useAuth";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Resume" component={ResumeScreen} />
      <Stack.Screen
        name="NewResume"
        component={NewResumeScreen}
        options={{ title: "New" }}
      />
      <Stack.Screen
        name="ReviewNewResume"
        component={ReviewNewResumeScreen}
        options={{ title: "Review" }}
      />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetailsScreen}
        options={{ title: "Details" }}
      />
      <Stack.Screen
        name="WorkExperience"
        component={WorkExperienceScreen}
        options={{ title: "Work" }}
      />
      <Stack.Screen name="Education" component={EducationScreen} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="ApplicationModal"
          component={ApplicationModalScreen}
          options={{ title: "Application" }}
        />
        <Stack.Screen
          name="ApplyModal"
          component={ApplyModalScreen}
          options={{ title: "Apply" }}
        />
        <Stack.Screen
          name="SettingsModal"
          component={SettingsModalScreen}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="AddWorkModal"
          component={AddWorkModalScreen}
          options={{ title: "Add Work Experience" }}
        />
        <Stack.Screen
          name="AddEducationModal"
          component={AddEducationModalScreen}
          options={{ title: "Add Education" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Applications"
        component={ApplicationsScreen}
        options={({ navigation }: RootTabScreenProps<"Applications">) => ({
          title: "Applications",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" color={color} size={24} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={24} />
          ),
          headerRight: ({ color }) => (
            <Pressable
              onPress={() => navigation.navigate("SettingsModal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Ionicons
                name="settings"
                color={color}
                size={24}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
