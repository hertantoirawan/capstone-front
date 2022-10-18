import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Card, Button, Divider, List, Checkbox } from "react-native-paper";
import moment from "moment";
import axios from "axios";
import { APP_BACKEND_URL } from "@env";
import { MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";

export default function EducationScreen({ route, navigation }) {
  const [education, setEducation] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const getEducation = () => {
    axios
      .get(`${APP_BACKEND_URL}/user/1/education`)
      .then((res) => {
        setEducation(res.data);
        setRefreshing(false);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEducation();
    console.log();
  }, []);

  const handleNext = () => {
    const { resume } = route.params;
    resume.education = education;

    console.log("resume in education screen");
    console.log(resume);

    navigation.navigate("ReviewNewResume", {
      resume,
    });
  };

  const deleteEducation = (item) => {
    let edu = [...education];
    edu = edu.filter((study) => study.id !== item.id);

    setEducation(edu);
  };

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={education}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card} mode="outlined">
            <Card.Title
              title={item.school}
              subtitle={moment(item.end).format("YYYY")}
              right={(props) => (
                <MaterialIcons
                  {...props}
                  name="delete-outline"
                  size={24}
                  style={{ marginRight: 16 }}
                  color="black"
                  onPress={() => deleteEducation(item)}
                />
              )}
            />
            <Card.Content>
              <Text>{item.degree}</Text>
              <Text>{item.description}</Text>
            </Card.Content>
          </Card>
        )}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getEducation} />
        }
      />
      <Button style={styles.button} mode="contained" onPress={handleNext}>
        Next
      </Button>
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
