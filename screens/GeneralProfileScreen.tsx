import { View, Text } from "../components/Themed";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet } from "react-native";

const user = {
  name: "Hertanto Irawan",
  profile: "Software engineer with 10+ years of experience in Asia and the US.",
  websites: [{ id: 1, name: "linkedin", link: "linkedin.com/in/hertantolie" }],
  email: "hertanto.irawan@outlook.com",
  phone: "+628979655562",
};

export default function GeneralProfileScreen({ navigation }) {
  const saveGeneralProfile = () => {
    console.log("save general profile");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Name"
        value={user.name}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        value={user.email}
      />
      {user.websites.map((website) => (
        <TextInput
          key={website.id}
          style={styles.input}
          mode="outlined"
          label="Website"
          value={website.link}
        />
      ))}
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Mobile number"
        value={user.phone}
      />
      <TextInput
        style={styles.multilineInput}
        mode="outlined"
        label="Personal Profile"
        multiline={true}
        value={user.profile}
      />
      <Button
        style={styles.input}
        mode="contained"
        onPress={saveGeneralProfile}
      >
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 10,
  },
  multilineInput: {
    margin: 10,
    height: 100,
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
