import { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import GeneralRoute from "./GeneralProfileScreen";
import WorkExperienceRoute from "./WorkProfileScreen";
import EducationRoute from "./EducationProfileScreen";

const renderScene = SceneMap({
  general: GeneralRoute,
  work: WorkExperienceRoute,
  education: EducationRoute,
});

export default function ProfileScreen({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "general", title: "General" },
    { key: "work", title: "Work" },
    { key: "education", title: "Education" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
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
