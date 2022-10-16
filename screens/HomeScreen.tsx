import { StyleSheet, FlatList } from "react-native";
import { Card, Chip, FAB } from "react-native-paper";
import { View, Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { APP_BACKEND_URL } from "@env";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState([]);

  useEffect(() => {
    axios
      .get(`${APP_BACKEND_URL}/user/1/resume`)
      .then((res) => {
        setResume(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddNewResume = () => {
    console.log("Adding new resume...");
    navigation.navigate("Projects");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={resume}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            style={styles.card}
            mode="outlined"
            onPress={() => navigation.navigate("Resume", { resume: item })}
          >
            <Card.Cover
              style={styles.cover}
              source={require("../assets/images/resume-template.png")}
            />
            <Card.Title title={item.name} subtitle={item.description} />
            <Card.Content style={styles.tags}>
              {item.tags.map(({ name }) => (
                <Chip key={`${item.id}-${name}`} style={{ marginRight: 8 }}>
                  {name}
                </Chip>
              ))}
            </Card.Content>
          </Card>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <FAB icon="plus" style={styles.fab} onPress={handleAddNewResume} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
  cover: {
    height: 100,
  },
  tags: {
    flex: 1,
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
