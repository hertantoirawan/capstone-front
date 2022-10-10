import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Pressable } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";
import moment from "moment";

import { Text, View } from "../components/Themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ApplyModalScreen({ route }) {
  const html = route.params.html;
  const resume = route.params.resume;

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      // printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await shareAsync(resume, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

        <Button style={styles.input} mode="contained">
          Save
        </Button>
      </View>

      <View style={styles.links}>
        <Button
          style={styles.link}
          mode="contained"
          icon="share-variant"
          onPress={printToFile}
        >
          Share
        </Button>
        <Button
          style={styles.link}
          mode="contained"
          icon="printer"
          onPress={print}
        >
          Print
        </Button>
      </View>

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
    justifyContent: "space-between",
    flexDirection: "row",
  },
  link: {
    flex: 1,
  },
});
