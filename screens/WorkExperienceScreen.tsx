import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import { Button, Card } from "react-native-paper";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import axios from "axios";
import { APP_BACKEND_URL } from "@env";

export default function WorkExperienceScreen({ route, navigation }) {
  const [workExperience, setWorkExperience] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const getWorkExperience = () => {
    axios
      .get(`${APP_BACKEND_URL}/user/1/work`)
      .then((res) => {
        setWorkExperience(res.data);
        setRefreshing(false);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWorkExperience();
  }, []);

  const handleNext = () => {
    const { resume } = route.params;
    resume.work = workExperience;

    navigation.navigate("Education", {
      resume,
    });
  };

  const deleteWork = (item) => {
    let work = [...workExperience];
    work = work.filter((exp) => exp.id !== item.id);

    setWorkExperience(work);
  };

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={workExperience}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card} mode="outlined">
            <Card.Title
              title={`${item.role} at ${item.company}`}
              subtitle={`${moment(item.start).format("YYYY")} - ${
                item.end ? moment(item.end).format("YYYY") : "Present"
              }`}
              right={(props) => (
                <MaterialIcons
                  {...props}
                  name="delete-outline"
                  size={24}
                  style={{ marginRight: 16 }}
                  color="black"
                  onPress={() => deleteWork(item)}
                />
              )}
            />
            <Card.Content>
              <Text>{item.contribution}</Text>
            </Card.Content>
          </Card>
        )}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getWorkExperience}
          />
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
