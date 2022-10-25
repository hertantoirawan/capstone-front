import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, FlatList } from "react-native";
import { Button, Divider, List, Checkbox, Searchbar } from "react-native-paper";
import axios from "axios";

import { View } from "../components/Themed";
import { useAuth } from "../hooks/useAuth";

export default function ProjectsScreen({ route, navigation }) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [selectedRepositoryList, setSelectedRepositoryList] = useState<
    Repository[]
  >([]);

  interface Repository {
    id: number;
    name: string;
    description: string;
  }

  const { user } = useAuth();

  useEffect(() => {
    try {
      axios
        .get<Repository[]>(
          `https://api.github.com/users/${user.username}/repos`
        )
        .then((response) => {
          console.log(response.data);
          setRepositories(response.data);
          setRepositoryList(response.data);
        });
    } catch (error) {
      console.log("error message");
    }
  }, []);

  interface RepositoryListProps {
    items: Repository[];
  }

  const handleSelectRepository = (repo) => {
    console.log(`selecting repo: ${repo.name}`);
    const repos: Array<Repository> =
      selectedRepositoryList.length === 0 ? [] : [...selectedRepositoryList];

    if (
      repos.filter((selectedRepo) => selectedRepo.id === repo.id).length > 0
    ) {
      const newRepos = repos.filter(
        (selectedRepo) => selectedRepo.id !== repo.id
      );
      setSelectedRepositoryList(newRepos);
    } else {
      repos.push({
        id: repo.id,
        name: repo.name,
        description: repo.description,
      });
      setSelectedRepositoryList(repos);
    }
  };

  const isRepoSelected = (repo) => {
    return (
      selectedRepositoryList.filter(
        (selectedRepo) => selectedRepo.id === repo.id
      ).length > 0
    );
  };

  const RepositoryList: React.FC<RepositoryListProps> = ({ items }) => {
    return (
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <>
            <Divider />
            <List.Item
              title={item.name}
              description={item.description}
              right={(props) => (
                <Checkbox
                  {...props}
                  status={isRepoSelected(item) ? "checked" : "unchecked"}
                />
              )}
              onPress={() => {
                handleSelectRepository(item);
              }}
            />
          </>
        )}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  const [text, setText] = useState("");
  const handleSearch = (text: string) => {
    setText(text);
    const repos = [...repositories];
    setRepositoryList(
      repos.filter((repo) => repo.name.includes(text.toLowerCase()))
    );
  };

  const handleNext = () => {
    const { resume } = route.params;
    resume.repositories = selectedRepositoryList;

    navigation.navigate("ProjectDetails", {
      resume,
    });
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.input}
        placeholder="Search"
        onChangeText={handleSearch}
        value={text}
      />
      <RepositoryList items={repositoryList} />

      <Button style={styles.input} mode="contained" onPress={handleNext}>
        Next
      </Button>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
  inputs: {
    width: "100%",
    padding: 10,
  },
  input: {
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
