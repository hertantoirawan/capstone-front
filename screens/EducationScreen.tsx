import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, FlatList } from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  Divider,
  List,
  Checkbox,
} from "react-native-paper";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";

const education = [
  {
    id: 1,
    school: "Foothill Junior College",
    degree: "Associate Degree (Computer Science)",
    start: "",
    end: "1/1/2010",
    description: "",
  },
  {
    id: 2,
    school: "University of California, San Diego",
    degree: "Bachelor of Science (Computer Science)",
    start: "",
    end: "1/1/2012",
    description: "",
  },
  {
    id: 3,
    school: "Rocket Academy",
    degree: "Software Engineering Bootcamp",
    start: "",
    end: "1/1/2022",
    description: "",
  },
];

export default function EducationScreen({ route, navigation }) {
  const [isSnackbarVisible, setSnackbarVisibility] = useState(false);
  const onDismissSnackBar = () => setSnackbarVisibility(false);

  const handleNext = () => {
    navigation.navigate("Home", {
      resume: route.params.resume,
    });
  };

  const isEducationSelected = (item) => {
    return false;
  };

  const handleSelectEducation = (item) => {
    console.log(`select education: ${item}`);
  };

  const EducationList = ({ items }) => {
    return (
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <>
            <Divider />
            <List.Item
              title={item.school}
              description={`${item.degree}, ${moment(item.end).format("YYYY")}`}
              right={(props) => (
                <Checkbox
                  {...props}
                  status={isEducationSelected(item) ? "checked" : "unchecked"}
                />
              )}
              onPress={() => {
                handleSelectEducation(item);
              }}
            />
          </>
        )}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <EducationList items={education} />
      <Button style={styles.button} mode="contained" onPress={handleNext}>
        Next
      </Button>

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
