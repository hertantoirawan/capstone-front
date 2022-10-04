import { View } from "../components/Themed";

import { Text, Button } from "react-native-paper";
// import { useAuth } from "../hooks/useAuth.js";
import { StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
  // const { user } = useAuth();
  const handlePress = () => {
    console.log("in handlePress");
    navigation.navigate("Root");
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={handlePress}>
        Log In With Github
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
