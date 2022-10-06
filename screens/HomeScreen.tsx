import { StyleSheet, FlatList, Platform } from "react-native";
import { Card, Divider, Chip, FAB, Button } from "react-native-paper";
import { View, Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React from "react";
import CardActions from "react-native-paper/lib/typescript/components/Card/CardActions";

const resumes = [
  {
    id: 1,
    name: "Default",
    description: "General resume",
    tags: [],
  },
  {
    id: 2,
    name: "Software Engineer",
    description: "Software Engineer resume",
    tags: ["engineer", "Google", "senior"],
  },
  {
    id: 3,
    name: "Project Manager",
    description: "Project Manager resume",
    tags: ["project", "Stripe"],
  },
];

const handleAddNewResume = () => {
  console.log("Adding new resume...");
};

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={resumes}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            mode="outlined"
            onPress={() => navigation.navigate("Resume", { resume: item })}
          >
            <Card.Cover source={{ uri: "https://picsum.photos/500" }} />
            <Card.Title title={item.name} subtitle={item.description} />
            <Card.Content style={styles.tags}>
              {item.tags.map((tag) => (
                <Chip style={{ marginRight: 8 }}>{tag}</Chip>
              ))}
            </Card.Content>
          </Card>
        )}
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
