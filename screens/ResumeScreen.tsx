import { View, Text } from "../components/Themed";

import { useEffect, useState } from "react";
import { Button, Chip } from "react-native-paper";
import { StyleSheet, Image, Platform } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { WebView } from "react-native-webview";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Navigation from "../navigation";

export default function Resume({ route, navigation }) {
  const resume = route.params.resume;
  const [resumeImage, setResumeImage] = useState("");
  const [selectedPrinter, setSelectedPrinter] = useState();

  const user = {
    name: "Hertanto Irawan",
    email: "hertanto.irawan@outlook.com",
    phone: "+628979655562",
    website: "https://github.com/hertantoirawan",
  };

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Joe Bloggs - Curriculum Vitae</title>

    <meta name="viewport" content="width=device-width" />
    <meta name="description" content="The Curriculum Vitae of Joe Bloggs." />
    <meta charset="UTF-8" />

    <link
      href="http://fonts.googleapis.com/css?family=Rokkitt:400,700|Lato:400,300"
      rel="stylesheet"
      type="text/css"
    />

    <style type="text/css">
      html,
      body,
      div,
      span,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      abbr,
      address,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      samp,
      small,
      strong,
      sub,
      sup,
      var,
      b,
      i,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        border: 0;
        font: inherit;
        font-size: 100%;
        margin: 0;
        padding: 0;
        vertical-align: baseline;
      }

      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section {
        display: block;
      }

      html,
      body {
        font-family: "Lato", helvetica, arial, sans-serif;
        font-size: 16px;
        color: #222;
      }

      .clear {
        clear: both;
      }

      p {
        font-size: 1em;
        line-height: 1.4em;
        margin-bottom: 20px;
        color: #444;
      }

      #cv {
        width: 90%;
        max-width: 800px;
        background: #f3f3f3;
        margin: 30px auto;
      }

      .mainDetails {
        padding: 25px 35px;
        border-bottom: 2px solid #cf8a05;
        background: #ededed;
      }

      #name h1 {
        font-size: 2.5em;
        font-weight: 700;
        font-family: "Rokkitt", Helvetica, Arial, sans-serif;
        margin-bottom: -6px;
      }

      #name h2 {
        font-size: 2em;
        margin-left: 2px;
        font-family: "Rokkitt", Helvetica, Arial, sans-serif;
      }

      #mainArea {
        padding: 0 40px;
      }

      #headshot {
        width: 12.5%;
        float: left;
        margin-right: 30px;
      }

      #headshot img {
        width: 100%;
        height: auto;
        -webkit-border-radius: 50px;
        border-radius: 50px;
      }

      #name {
        float: left;
      }

      #contactDetails {
        float: right;
      }

      #contactDetails ul {
        list-style-type: none;
        font-size: 0.9em;
        margin-top: 2px;
      }

      #contactDetails ul li {
        margin-bottom: 3px;
        color: #444;
      }

      section {
        border-top: 1px solid #dedede;
        padding: 20px 0 0;
      }

      section:first-child {
        border-top: 0;
      }

      section:last-child {
        padding: 20px 0 10px;
      }

      .sectionTitle {
        float: left;
        width: 25%;
      }

      .sectionContent {
        float: right;
        width: 72.5%;
      }

      .sectionTitle h1 {
        font-family: "Rokkitt", Helvetica, Arial, sans-serif;
        font-style: italic;
        font-size: 1.5em;
        color: #cf8a05;
      }

      .sectionContent h2 {
        font-family: "Rokkitt", Helvetica, Arial, sans-serif;
        font-size: 1.5em;
        margin-bottom: -2px;
      }

      .subDetails {
        font-size: 0.8em;
        font-style: italic;
        margin-bottom: 3px;
      }

      .keySkills {
        list-style-type: none;
        -moz-column-count: 3;
        -webkit-column-count: 3;
        column-count: 3;
        margin-bottom: 20px;
        font-size: 1em;
        color: #444;
      }

      .keySkills ul li {
        margin-bottom: 3px;
      }
    </style>
  </head>
  <body id="top">
    <div id="cv">
      <div class="mainDetails">
        <div id="name">
          <h1>${user.name}</h1>
          <h2>Software Engineer</h2>
        </div>

        <div id="contactDetails">
          <ul>
            <li>
              e:
              <a href="mailto:${user.email}" target="_blank">${user.email}</a>
            </li>
            <li>w: <a href="${user.website}">github.com/${
    user.website.split("github.com/")[1]
  }</a></li>
            <li>m: ${user.phone}</li>
          </ul>
        </div>
        <div class="clear"></div>
      </div>

      <div id="mainArea">
        <section>
          <article>
            <div class="sectionTitle">
              <h1>Personal Profile</h1>
            </div>

            <div class="sectionContent">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                dolor metus, interdum at scelerisque in, porta at lacus.
              </p>
            </div>
          </article>
          <div class="clear"></div>
        </section>

        <section>
          <div class="sectionTitle">
            <h1>Work Experience</h1>
          </div>

          <div class="sectionContent">
            <article>
              <h2>Job Title at Company</h2>
              <p class="subDetails">April 2011 - Present</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                dolor metus, interdum at scelerisque in, porta at lacus.
              </p>
            </article>

            <article>
              <h2>Job Title at Company</h2>
              <p class="subDetails">January 2007 - March 2011</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                dolor metus, interdum at scelerisque in, porta at lacus.
              </p>
            </article>
          </div>
          <div class="clear"></div>
        </section>

        <section>
          <div class="sectionTitle">
            <h1>Projects</h1>
          </div>

          <div class="sectionContent">
            <article>
              <h2>Capstone Project</h2>
              <p class="subDetails">React Native, Express</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                dolor metus, interdum at scelerisque in, porta at lacus.
              </p>
            </article>

            <article>
              <h2>React Project</h2>
              <p class="subDetails">React, Express, Material-UI</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                dolor metus, interdum at scelerisque in, porta at lacus.
              </p>
            </article>
          </div>
          <div class="clear"></div>
        </section>

        <section>
          <div class="sectionTitle">
            <h1>Education</h1>
          </div>

          <div class="sectionContent">
            <article>
              <h2>Rocket Academy</h2>
              <p class="subDetails">Qualification</p>
              <p>Part-Time Coding Bootcamp</p>
            </article>

            <article>
              <h2>University of California</h2>
              <p class="subDetails">Qualification</p>
              <p>Bachelor of Science (Computer Science)</p>
            </article>
          </div>
          <div class="clear"></div>
        </section>
      </div>
    </div>
  </body>
</html>
`;

  useEffect(() => {
    const displayResume = async () => {
      const { uri } = await Print.printToFileAsync({ html });
      console.log("File has been saved to:", uri);
      setResumeImage(uri);
    };

    displayResume();
  }, []);

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await shareAsync(resumeImage, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  // const selectPrinter = async () => {
  //   const printer = await Print.selectPrinterAsync(); // iOS only
  //   setSelectedPrinter(printer);
  // };

  const edit = () => {
    console.log("edit resume");
    // navigation.navigate('Edit');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{resume.name}</Text>
      <Text>{resume.description}</Text>
      <View style={styles.tags}>
        {resume.tags.map((tag: string[]) => (
          <Chip style={{ marginRight: 8 }}>{tag}</Chip>
        ))}
      </View>
      <View style={styles.links}>
        <Ionicons name="share" size={24} color="black" onPress={printToFile} />
        <Ionicons name="print" size={24} color="black" onPress={print} />
        <MaterialIcons name="edit" size={24} color="black" onPress={edit} />
      </View>
      {/* {Platform.OS === "ios" && (
        <>
          <View style={styles.spacer} />
          <Button onPress={selectPrinter}>Select Printer</Button>
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text
              style={styles.printer}
            >{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )} */}
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
  },
  resume: {
    width: 400,
    height: 500,
  },
});
