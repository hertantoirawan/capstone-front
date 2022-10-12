import { View, Text } from "../components/Themed";
import { TextInput, Button, FAB, Card } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import moment from "moment";

const education = [
  {
    id: 1,
    school: "Foothill Junior College",
    degree: "Associate Degree (Computer Science)",
    start: "",
    end: "1/1/2010",
    description: "",
  },
  {
    id: 2,
    school: "University of California, San Diego",
    degree: "Bachelor of Science (Computer Science)",
    start: "",
    end: "1/1/2012",
    description: "",
  },
  {
    id: 3,
    school: "Rocket Academy",
    degree: "Software Engineering Bootcamp",
    start: "",
    end: "1/1/2022",
    description: "",
  },
];

export default function EducationProfileScreen({ navigation }) {
  const addEducation = () => {
    console.log("add education");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={education}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card} mode="outlined">
            <Card.Title
              title={item.school}
              subtitle={moment(item.end).format("YYYY")}
            />
            <Card.Content style={styles.tags}>
              <Text>{item.degree}</Text>
              <Text>{item.description}</Text>
            </Card.Content>
          </Card>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <FAB icon="plus" style={styles.fab} onPress={addEducation} />
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
