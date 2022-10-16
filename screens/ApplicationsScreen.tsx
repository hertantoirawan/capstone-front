import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { Text, View } from "../components/Themed";
import moment from "moment";
import axios from "axios";
import { APP_BACKEND_URL } from "@env";

const ITEMS_PER_PAGE = 10;

export default function ApplicationsScreen({ navigation }) {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] =
    useState(ITEMS_PER_PAGE);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, applications.length);

  useEffect(() => {
    axios
      .get(`${APP_BACKEND_URL}/user/1/application`)
      .then((res) => {
        setApplications(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    setPage(0);
  }, [numberOfItemsPerPage]);

  const handleRowClick = (application) => {
    // open application details
    navigation.navigate("ApplicationModal", { application });
  };

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 2 }}>Role</DataTable.Title>
          <DataTable.Title>Company</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {applications
          .slice(
            page * numberOfItemsPerPage,
            page * numberOfItemsPerPage + numberOfItemsPerPage
          )
          .map((application) => (
            <DataTable.Row
              key={application.id}
              onPress={() => handleRowClick(application)}
            >
              <DataTable.Cell style={{ flex: 2 }}>
                {application.role}
              </DataTable.Cell>
              <DataTable.Cell>{application.company}</DataTable.Cell>
              <DataTable.Cell>
                {moment(application.date, "YYYY-MM-DD").fromNow()}
              </DataTable.Cell>
            </DataTable.Row>
          ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(applications.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${applications.length}`}
          numberOfItemsPerPage={numberOfItemsPerPage}
        />
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
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
