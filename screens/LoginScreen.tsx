import { View, Text } from "../components/Themed";

import { Button } from "react-native-paper";
// import { useAuth } from "../hooks/useAuth.js";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useState } from "react";
import { APP_BACKEND_URL } from "@env";

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState(null);

  // const { user } = useAuth();
  const handlePress = () => {
    console.log("in handlePress");
    console.log(APP_BACKEND_URL);

    axios
      .get(`${APP_BACKEND_URL}/user/1`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        navigation.navigate("Root");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={handlePress}>
        Log In With GitHub
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
