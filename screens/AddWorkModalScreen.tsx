import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import { Text, View } from "../components/Themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddWorkModalScreen({ route, navigation }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [contribution, setContribution] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [isSnackbarVisible, setSnackbarVisibility] = useState(false);

  const onDismissSnackBar = () => {
    setSnackbarVisibility(false);
    navigation.goBack();
  };

  const addWorkExperience = () => {
    console.log("adding new work experience");
    setSnackbarVisibility(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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

          <View style={styles.dates}>
            <Pressable
              onPress={() => setShowStartDatePicker(true)}
              style={styles.datePressable}
            >
              <View pointerEvents="none">
                <TextInput
                  style={styles.dateInput}
                  mode="outlined"
                  label="Start"
                  value={moment(startDate).format("DD MMMM YYYY")}
                />
              </View>
            </Pressable>
            <Pressable
              onPress={() => setShowEndDatePicker(true)}
              style={styles.datePressable}
            >
              <View pointerEvents="none">
                <TextInput
                  style={styles.dateInput}
                  mode="outlined"
                  label="End"
                  value={moment(endDate).format("DD MMMM YYYY")}
                />
              </View>
            </Pressable>
          </View>

          <DateTimePickerModal
            isVisible={showStartDatePicker}
            mode="date"
            onConfirm={(newDate) => {
              setStartDate(newDate);
              setShowStartDatePicker(false);
            }}
            onCancel={() => setShowStartDatePicker(false)}
            date={startDate}
          />

          <DateTimePickerModal
            isVisible={showEndDatePicker}
            mode="date"
            onConfirm={(newDate) => {
              setEndDate(newDate);
              setShowEndDatePicker(false);
            }}
            onCancel={() => setShowEndDatePicker(false)}
            date={endDate}
          />
          <TextInput
            style={styles.multilineInput}
            mode="outlined"
            label="Contribution"
            value={contribution}
            multiline={true}
            onChangeText={(contribution) => setContribution(contribution)}
          />
          <Button
            style={styles.input}
            mode="contained"
            onPress={addWorkExperience}
          >
            Save
          </Button>
        </View>

        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Dismiss",
          }}
        >
          Work experience has been added.
        </Snackbar>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </TouchableWithoutFeedback>
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
  dateInput: {
    margin: 10,
  },
  multilineInput: {
    margin: 10,
    height: 100,
  },
  datePressable: {
    flex: 1,
  },
  dates: {
    flexDirection: "row",
    justifyContent: "space-between",
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
