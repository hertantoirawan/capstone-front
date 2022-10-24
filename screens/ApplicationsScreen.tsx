import { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Card } from "react-native-paper";
import { Text, View } from "../components/Themed";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const ITEMS_PER_PAGE = 10;

export default function ApplicationsScreen({ navigation }) {
  const [applications, setApplications] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const { user } = useAuth();

  const getApplications = () => {
    axios
      .get(`${process.env.APP_BACKEND_URL}/user/${user.id}/application`)
      .then((res) => {
        setApplications(res.data);
        setRefreshing(false);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getApplications();
  }, []);

  const handleRowClick = (application) => {
    // open application details
    navigation.navigate("ApplicationModal", { application });
  };

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={applications}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            style={styles.card}
            mode="outlined"
            onPress={() => handleRowClick(item)}
          >
            <Card.Title
              title={item.role}
              subtitle={item.company}
              right={(props) => (
                <Text {...props} style={{ marginRight: 16 }}>
                  {moment(item.date).format("DD MMM YYYY")}
                </Text>
              )}
            />
          </Card>
        )}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getApplications} />
        }
      />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
