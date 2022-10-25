import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Pressable } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

import { View } from "../components/Themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ApplyModalScreen({ route }) {
  const html = route.params.html;
  const resume = route.params.resume;

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const { user } = useAuth();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      // printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await shareAsync(resume.image, {
      UTI: ".pdf",
      mimeType: "application/pdf",
    });
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSnackbarVisible, setSnackbarVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (newDate) => {
    setDate(newDate);
    hideDatePicker();
  };

  const onDismissSnackBar = () => setSnackbarVisibility(false);

  const saveApplication = () => {
    console.log("save application");

    axios
      .post(`${process.env.APP_BACKEND_URL}/user/${user.id}/application`, {
        role: role,
        company: company,
        date: date,
        resumeId: resume.id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    setSnackbarVisibility(true);
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

        <Pressable onPress={showDatePicker}>
          <View pointerEvents="none">
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Date"
              value={moment(date).format("DD MMMM YYYY")}
            />
          </View>
        </Pressable>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={date}
        />

        <Button style={styles.input} mode="contained" onPress={saveApplication}>
          Save
        </Button>
      </View>

      <View style={styles.links}>
        <Button
          style={styles.linkLeft}
          mode="contained"
          icon="share-variant"
          onPress={printToFile}
        >
          Share
        </Button>
        <Button
          style={styles.linkRight}
          mode="contained"
          icon="printer"
          onPress={print}
        >
          Print
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
  datepicker: {
    flex: 1,
    width: "100%",
  },
  links: {
    padding: 20,
    paddingTop: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  linkLeft: {
    flex: 1,
    marginRight: 16,
  },
  linkRight: {
    flex: 1,
  },
});
