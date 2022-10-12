import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Pressable } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";

export default function EducationScreen({ route, navigation }) {
  const repositories = route.params.repositories;
  console.log(repositories);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [isSnackbarVisible, setSnackbarVisibility] = useState(false);

  const onDismissSnackBar = () => setSnackbarVisibility(false);

  const handleNext = () => {
    navigation.navigate("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Company"
          value={company}
          onChangeText={(comp) => setCompany(comp)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Role"
          value={role}
          onChangeText={(jobRole) => setRole(jobRole)}
        />

        <Button style={styles.button} mode="contained" onPress={handleNext}>
          Next
        </Button>
      </View>

      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Dismiss",
        }}
      >
        Application has been saved.
      </Snackbar>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputs: {
    width: "100%",
    padding: 10,
  },
  input: {
    margin: 10,
  },
  button: {
    margin: 10,
  },
  datepicker: {
    flex: 1,
    width: "100%",
  },
  links: {
    padding: 20,
    paddingTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  link: {
    flex: 1,
  },
});
