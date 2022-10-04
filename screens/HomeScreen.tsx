import { StyleSheet, FlatList, Image } from "react-native";
import { Text, Card, Divider, Chip } from "react-native-paper";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

const resumes = [
  {
    id: 1,
    name: "Default",
    description: "General resume",
    tags: [],
  },
  {
    id: 2,
    name: "Technical",
    description: "Technical resume",
    tags: ["engineer", "Google", "senior"],
  },
  {
    id: 3,
    name: "Project Manager",
    description: "Project Manager resume",
    tags: ["project", "Stripe"],
  },
];

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Divider />
      <FlatList
        data={resumes}
        renderItem={({ item }) => (
          <Card>
            <Card.Cover source={{ uri: "https://picsum.photos/500" }} />
            <Card.Title title={item.name} subtitle={item.description} />
            <Card.Content style={styles.card}>
              {item.tags.map((tag) => (
                <Chip style={{ marginRight: 8 }}>{tag}</Chip>
              ))}
            </Card.Content>
          </Card>
        )}
      />
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
    flex: 1,
    flexDirection: "row",
  },
});
