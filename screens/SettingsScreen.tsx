import { StyleSheet, Platform } from "react-native";
import { useState, useCallback } from "react";
import { Button } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SettingsScreen({
  navigation,
}: RootTabScreenProps<"Settings">) {
  const [date, setDate] = useState(new Date());

  const setNewDate = (event, selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text>selected: {date.toLocaleDateString()}</Text>
      <DateTimePicker value={date} onChange={setNewDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
