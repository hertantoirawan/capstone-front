import { View, Text } from "../components/Themed";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function GeneralProfileScreen({ navigation }) {
  const [user, setUser] = useState(useAuth().user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");
  const [isSnackbarVisible, setSnackbarVisibility] = useState(false);
  const onDismissSnackBar = () => setSnackbarVisibility(false);

  const getUserInfo = () => {
    axios
      .get(`${process.env.APP_BACKEND_URL}/user/${user.id}`)
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setWebsite(res.data.website);
        setPhone(res.data.phone);
        setProfile(res.data.profile);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const saveGeneralProfile = () => {
    axios
      .post(`${process.env.APP_BACKEND_URL}/user/${user.id}`, {
        name: name,
        profile: profile,
        website: website,
        email: email,
        phone: phone,
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        setSnackbarVisibility(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Website"
        value={website}
        onChangeText={(website) => setWebsite(website)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Mobile number"
        value={phone}
        onChangeText={(phone) => setPhone(phone)}
      />
      <TextInput
        style={styles.multilineInput}
        mode="outlined"
        label="Personal Profile"
        multiline={true}
        value={profile}
        onChangeText={(profile) => setProfile(profile)}
      />
      <Button
        style={styles.input}
        mode="contained"
        onPress={saveGeneralProfile}
      >
        Save
      </Button>
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Dismiss",
        }}
      >
        General info has been saved.
      </Snackbar>
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
