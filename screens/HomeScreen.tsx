import { StyleSheet, FlatList } from "react-native";
import { Card, Chip, FAB } from "react-native-paper";
import { View, Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React from "react";
import ApplicationModalScreen from "./ApplicationModalScreen";

const resumes = [
  {
    id: 1,
    name: "Frontend Engineer",
    description:
      "Resume for software engineering roles that focus on frontend.",
    tags: ["engineer", "senior", "frontend"],
  },
  {
    id: 2,
    name: "Backend Engineer",
    description: "Resume for software engineering roles that focus on backend.",
    tags: ["engineer", "junior", "backend"],
  },
  {
    id: 3,
    name: "Full Stack Developer",
    description: "Resume for full stack software engineering roles.",
    tags: ["frontend", "backend"],
  },
  {
    id: 4,
    name: "Project Manager",
    description: "Resume for project management or team leading roles",
    tags: ["project", "lead", "agile", "waterfall"],
  },
];

export default function HomeScreen({ navigation }) {
  const handleAddNewResume = () => {
    console.log("Adding new resume...");
    navigation.navigate("Projects");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={resumes}
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
              {item.tags.map((tag) => (
                <Chip key={`${item.id}-${tag}`} style={{ marginRight: 8 }}>
                  {tag}
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
