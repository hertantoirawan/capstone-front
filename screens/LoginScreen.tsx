import { View } from "../components/Themed";

import { Button } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const { setUser } = useAuth();

  const handlePress = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      `${process.env.APP_BACKEND_AUTH_URL}/?linkingUri=${Linking.createURL(
        "/?"
      )}`
    );

    let redirectData;
    if (result.url) {
      redirectData = Linking.parse(result.url);

      const { userId, name, username, accessToken } = redirectData?.queryParams;

      setUser({
        id: userId,
        name: name,
        username: username,
        accessToken: accessToken,
      });
      navigation.navigate("Root");
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="logo-github" size={72} color="black" />
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
