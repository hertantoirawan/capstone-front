import { View, Text } from "../components/Themed";

import { useEffect, useState } from "react";
import { Button, Chip } from "react-native-paper";
import { StyleSheet, Image, Platform } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";

export default function Resume({ route, navigation }) {
  const resume = route.params.resume;
  const html = resume.htmlContent;
  const [resumeImage, setResumeImage] = useState("");

  const user = {
    name: "Hertanto Irawan",
    email: "hertanto.irawan@outlook.com",
    phone: "+628979655562",
    website: "https://github.com/hertantoirawan",
  };

  const setPDFfileName = (uri: string) => {
    const fileUserName = user.name.replace(" ", "_");
    const resumeName = resume.name.replace(" ", "_");

    const today = new Date();
    const fileDate = `${today.getFullYear()}${
      today.getMonth() + 1
    }${today.getDate()}`;

    const pdfName = `${uri.slice(
      0,
      uri.lastIndexOf("/") + 1
    )}resume_${fileUserName}-${resumeName}-${fileDate}.pdf`;

    return pdfName;
  };

  useEffect(() => {
    const displayResume = async () => {
      const { uri } = await Print.printToFileAsync({
        html,
      });

      const pdfName = setPDFfileName(uri);

      await FileSystem.moveAsync({
        from: uri,
        to: pdfName,
      });

      console.log("File has been saved to:", pdfName);
      setResumeImage(pdfName);
      resume.image = pdfName;
    };

    displayResume();
  }, []);

  const handleApply = () => {
    navigation.navigate("ApplyModal", {
      html,
      resume,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{resume.name}</Text>
      <Text>{resume.description}</Text>
      <View style={styles.tags}>
        {resume.tags.map(({ name }) => (
          <Chip key={`${resume.id}-${name}`} style={{ marginRight: 8 }}>
            {name}
          </Chip>
        ))}
      </View>
      <View style={styles.resume}>
        {resumeImage && (
          <WebView originWhitelist={["*"]} source={{ uri: resumeImage }} />
        )}
      </View>
      <View style={styles.links}>
        <Button style={styles.button} mode="contained" onPress={handleApply}>
          Apply
        </Button>
      </View>
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
