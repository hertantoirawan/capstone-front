import { View, Text } from "../components/Themed";

import { useEffect, useState } from "react";
import { Button, Chip } from "react-native-paper";
import { StyleSheet, Image, Platform } from "react-native";
import * as Print from "expo-print";
import { WebView } from "react-native-webview";
import axios from "axios";
import { APP_BACKEND_URL } from "@env";
import moment from "moment";

export default function ReviewNewResume({ route, navigation }) {
  const [template, setTemplate] = useState(null);
  const resume = route.params.resume;
  const [resumeImage, setResumeImage] = useState("");
  const [resumeHtml, setResumeHtml] = useState("");

  const user = {
    name: "Hertanto Irawan",
    email: "hertanto.irawan@outlook.com",
    phone: "+628979655562",
    website: "https://github.com/hertantoirawan",
    profile: "Software engineer with attention to details and hunger to learn.",
  };

  const fillInResumeInfo = (selectedTemplate): string => {
    let filledInResume = selectedTemplate.htmlContent;
    const articleHtml = selectedTemplate.htmlArticleTemplate;

    // fill in user profile
    filledInResume = filledInResume
      .replace("{{name}}", user.name)
      .replace("{{resume}}", resume.name)
      .replace("{{email}}", `<a href='mailto:${user.email}'>${user.email}</a>`)
      .replace("{{website}}", `<a href='${user.website}'>${user.website}</a>`)
      .replace("{{phone}}", user.phone)
      .replace("{{profile}}", user.profile);

    // fill in work experience
    let workExperience: string = "";
    resume.work.map((workExp) => {
      let workHtml = articleHtml;
      workHtml = workHtml
        .replace("{{title}}", `${workExp.role} at ${workExp.company}`)
        .replace(
          "{{subtitle}}",
          `${moment(workExp.start).format("MMMM YYYY")} - ${
            workExp.end ? moment(workExp.end).format("MMMM YYYY") : "Present"
          }`
        )
        .replace("{{content}}", `${workExp.contribution}`);

      workExperience += workHtml;
    });
    filledInResume = filledInResume.replace("{{work}}", workExperience);

    // fill in projects
    let projects: string = "";
    resume.repositories.map((repo) => {
      let repoHtml = articleHtml;
      repoHtml = repoHtml
        .replace("{{title}}", `${repo.name}`)
        .replace("{{subtitle}}", `${repo.description}`)
        .replace("{{content}}", `Tech: ${repo.tech}<br />${repo.contribution}`);
      projects += repoHtml;
    });
    filledInResume = filledInResume.replace("{{projects}}", projects);

    // fill in education
    let education: string = "";
    resume.education.map((edu) => {
      let eduHtml = articleHtml;
      eduHtml = eduHtml
        .replace("{{title}}", `${edu.school}`)
        .replace("{{subtitle}}", `${moment(edu.end).format("YYYY")}`)
        .replace("{{content}}", `${edu.degree}`);

      education += eduHtml;
    });
    filledInResume = filledInResume.replace("{{education}}", education);

    return filledInResume;
  };

  useEffect(() => {
    const displayResume = async (html: string) => {
      try {
        const { uri } = await Print.printToFileAsync({
          html,
        });

        console.log("File has been saved to:", uri);
        setResumeImage(uri);
        setResumeHtml(html);
        resume.image = uri;
      } catch (err) {
        console.log(err);
      }
    };

    // get template
    axios
      .get(`${APP_BACKEND_URL}/template/${resume.templateId}`)
      .then((res) => {
        setTemplate(res.data);
        console.log(res.data);

        // replace content
        const filledInResume: string = fillInResumeInfo(res.data);

        displayResume(filledInResume);
      })
      .catch((error) => console.log(error));
  }, []);

  const addNewResume = () => {
    axios
      .post(`${APP_BACKEND_URL}/user/1/resume`, {
        userId: 1,
        templateId: resume.templateId,
        name: resume.name,
        description: resume.description,
        htmlContent: resumeHtml,
        tags: resume.tags,
      })
      .then((res) => {
        console.log(res.data);
        navigation.navigate("Home");
      })
      .catch((error) => console.log(error));
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
        <Button style={styles.button} mode="contained" onPress={addNewResume}>
          Save
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
