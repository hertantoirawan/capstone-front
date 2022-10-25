import { View, Text } from "../components/Themed";
import { FAB, Card } from "react-native-paper";
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function EducationProfileScreen() {
  const navigation = useNavigation();
  const [education, setEducation] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const { user } = useAuth();

  const getEducation = () => {
    axios
      .get(`${process.env.APP_BACKEND_URL}/user/${user.id}/education`)
      .then((res) => {
        setEducation(res.data);
        setRefreshing(false);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEducation();
  }, []);

  const addEducation = () => {
    console.log("add education");
    navigation.navigate("AddEducationModal");
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
