import { View, Text } from "../components/Themed";

import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Print from "expo-print";
import { WebView } from "react-native-webview";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import moment from "moment";

export default function ApplicationModalScreen({ route, navigation }) {
  const application = route.params.application;

  const [resume, setResume] = useState(null);
  const [resumeImage, setResumeImage] = useState("");

  const { user } = useAuth();

  const getApplicationResume = async () => {
    const getResume = await axios.get(
      `${process.env.APP_BACKEND_URL}/user/${user.id}/resume/${application.resumeId}`
    );
    setResume(getResume.data);
    displayResume(getResume.data);
  };

  const displayResume = async (appResume) => {
    const { uri } = await Print.printToFileAsync({
      html: appResume.htmlContent,
    });

    setResumeImage(uri);
  };

  useEffect(() => {
    getApplicationResume();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {application.role} - {application.company}
      </Text>
      <Text>{moment(application.date).format("DD MMM YYYY hh:mm A")}</Text>
      <View style={styles.resume}>
        {resumeImage && (
          <WebView originWhitelist={["*"]} source={{ uri: resumeImage }} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  tags: {
    flexDirection: "row",
    padding: 10,
  },
  links: {
    flexDirection: "row",
    marginTop: 20,
    padding: 10,
  },
  resume: {
    width: 400,
    height: 500,
  },
  button: {
    flex: 1,
  },
});
