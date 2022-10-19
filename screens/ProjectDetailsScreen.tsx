import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  TextInput,
  Button,
  Divider,
  Card,
  List,
  Checkbox,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import { Text, View } from "../components/Themed";

interface Repository {
  id: number;
  name: string;
  description: string;
  tech: string;
  contribution: string;
}
interface RepositoryListProps {
  items: Repository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  items,
  updateProps,
}) => {
  const [text, setText] = useState({ editingIndex: -1, text: "" });
  const [multiText, setMultiText] = useState({ editingIndex: -1, text: "" });

  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => (
        <>
          <Divider />
          <List.Item title={item.name} description={item.description} />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Tech"
            value={text.editingIndex === index ? text.text : item.tech}
            onFocus={() =>
              setText({
                editingIndex: index,
                text: item.tech,
              })
            }
            onBlur={() => {
              updateProps("tech", item.id, text.text);
              setText({ editingIndex: -1, text: "" });
            }}
            onChangeText={(text) => setText({ text, editingIndex: index })}
          />
          <TextInput
            style={styles.multilineInput}
            mode="outlined"
            label="Contribution"
            multiline={true}
            value={
              multiText.editingIndex === index
                ? multiText.text
                : item.contribution
            }
            onFocus={() =>
              setMultiText({
                editingIndex: index,
                text: item.contribution,
              })
            }
            onBlur={() => {
              updateProps("contribution", item.id, multiText.text);
              setMultiText({ editingIndex: -1, text: "" });
            }}
            onChangeText={(text) => setMultiText({ text, editingIndex: index })}
          />
        </>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default function ProjectDetailsScreen({ route, navigation }) {
  const [repositories, setRepositories] = useState<Repository[]>(
    route.params.resume.repositories
  );

  const updateProps = (props: string, repoId, text: string) => {
    const repos = [...repositories];

    setRepositories((prevState) => {
      const repo = prevState.find((repo) => repo.id === repoId);

      if (repo) {
        repo[props] = text;
        console.log(repo[props]);
      }

      return prevState;
    });
  };

  const handleNext = () => {
    const { resume } = route.params;

    navigation.navigate("WorkExperience", {
      resume,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <RepositoryList items={repositories} updateProps={updateProps} />

      <Button style={styles.button} mode="contained" onPress={handleNext}>
        Next
      </Button>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </KeyboardAvoidingView>
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
  inputs: {
    width: "100%",
    padding: 10,
  },
  input: {
    margin: 10,
    marginTop: 0,
  },
  multilineInput: {
    margin: 10,
    marginTop: 0,
    height: 100,
  },
  button: {
    margin: 10,
  },
  datepicker: {
    flex: 1,
    width: "100%",
  },
  links: {
    padding: 20,
    paddingTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  link: {
    flex: 1,
  },
});
