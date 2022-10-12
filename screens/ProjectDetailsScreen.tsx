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
  Snackbar,
  Divider,
  Card,
  List,
  Checkbox,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import { Text, View } from "../components/Themed";

export default function ProjectDetailsScreen({ route, navigation }) {
  const [isSnackbarVisible, setSnackbarVisibility] = useState(false);

  const onDismissSnackBar = () => setSnackbarVisibility(false);

  const saveApplication = () => {
    console.log("save application");
    setSnackbarVisibility(true);
  };

  const [repositories, setRepositories] = useState<Repository[]>(
    route.params.resume.repositories
  );

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

  const updateProps = (props, repoId, text) => {
    const repos = [...repositories];
    const repo = repos.find((repo) => repo.id === repoId);
    if (repo) {
      repo[props] = text;
      console.log(repo[props]);
    }
    setRepositories(repos);
  };

  const RepositoryList: React.FC<RepositoryListProps> = ({ items }) => {
    return (
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <>
            <Divider />
            <List.Item title={item.name} description={item.description} />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Tech"
              // onChangeText={(text) => updateProps("tech", item.id, text)}
              value={item.tech}
            />
            <TextInput
              style={styles.multilineInput}
              mode="outlined"
              label="Contribution"
              multiline={true}
              // onChangeText={(text) =>
              //   updateProps("contribution", item.id, text)
              // }
              value={item.contribution}
            />
          </>
        )}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  const handleNext = () => {
    navigation.navigate("Education", {
      resume: {
        repositories: repositories,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <RepositoryList items={repositories} />

      <Button style={styles.button} mode="contained" onPress={handleNext}>
        Next
      </Button>

      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Dismiss",
        }}
      >
        Application has been saved.
      </Snackbar>

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
