import { View, Text } from "../components/Themed";
import { TextInput, Button, FAB, Card } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const workExperience = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Google",
    start: "1/1/2012",
    end: "12/31/2017",
    contribution: "Implemented google search",
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Facebook",
    start: "1/1/2018",
    end: "",
    contribution: "Implemented Facebook Messenger",
  },
];

export default function WorkProfileScreen() {
  const navigation = useNavigation();

  const addWorkExperience = () => {
    console.log("add work experience.");
    navigation.navigate("AddWorkModal");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={workExperience}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card} mode="outlined">
            <Card.Title
              title={`${item.role} at ${item.company}`}
              subtitle={`${item.start} - ${item.end ? item.end : "Present"}`}
            />
            <Card.Content style={styles.tags}>
              <Text>{item.contribution}</Text>
            </Card.Content>
          </Card>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <FAB icon="plus" style={styles.fab} onPress={addWorkExperience} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 10,
  },
  multilineInput: {
    margin: 10,
    height: 100,
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
