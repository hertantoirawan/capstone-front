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

const workExperience = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Google",
    start: "1/1/2012",
    end: "12/31/2017",
    contribution: "Implemented google search",
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Facebook",
    start: "1/1/2018",
    end: "",
    contribution: "Implemented Facebook Messenger",
  },
];

export default function WorkExperienceScreen({ route, navigation }) {
  const [isSnackbarVisible, setSnackbarVisibility] = useState(false);
  const onDismissSnackBar = () => setSnackbarVisibility(false);

  const handleNext = () => {
    navigation.navigate("Education", {
      resume: route.params.resume,
    });
  };

  const isWorkExperienceSelected = (item) => {
    return false;
  };

  const handleSelectWorkExperience = (item) => {
    console.log(`select education: ${item}`);
  };

  const WorkExperienceList = ({ items }) => {
    return (
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <>
            <Divider />
            <List.Item
              title={`${item.role} at ${item.company}`}
              description={`${moment(item.start).format("YYYY")} - ${
                item.end ? moment(item.end).format("YYYY") : "Present"
              }`}
              right={(props) => (
                <Checkbox
                  {...props}
                  status={
                    isWorkExperienceSelected(item) ? "checked" : "unchecked"
                  }
                />
              )}
              onPress={() => {
                handleSelectWorkExperience(item);
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
      <WorkExperienceList items={workExperience} />
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
