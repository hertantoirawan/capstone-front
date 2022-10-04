import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { Text, View } from "../components/Themed";
import moment from "moment";

const numberOfItemsPerPageList = [2, 3, 4];

const applications = [
  { id: 1, role: "Software Engineer", company: "Google", date: "10/1/2022" },
  { id: 2, role: "Project Manager", company: "Stripe", date: "10/1/2022" },
  { id: 3, role: "Software Engineer", company: "Grab", date: "10/1/2022" },
  { id: 4, role: "Software Engineer", company: "ZenDesk", date: "10/1/2022" },
  { id: 5, role: "Software Engineer", company: "Binance", date: "10/2/2022" },
  { id: 6, role: "Software Engineer", company: "Coinbase", date: "10/2/2022" },
  { id: 7, role: "Software Engineer", company: "Gojek", date: "10/2/2022" },
  { id: 8, role: "Software Engineer", company: "Traveloka", date: "10/3/2022" },
  { id: 9, role: "Software Engineer", company: "Facebook", date: "10/3/2022" },
  { id: 10, role: "Software Engineer", company: "Apple", date: "10/3/2022" },
];

export default function ApplicationsScreen() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, applications.length);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Applications</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Role</DataTable.Title>
          <DataTable.Title>Company</DataTable.Title>
          <DataTable.Title sortDirection="descending">Date</DataTable.Title>
        </DataTable.Header>

        {applications.map((application) => (
          <DataTable.Row>
            <DataTable.Cell>{application.role}</DataTable.Cell>
            <DataTable.Cell>{application.company}</DataTable.Cell>
            <DataTable.Cell>
              {moment(application.date, "MM/DD/YYYY").fromNow()}
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(applications.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${applications.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
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
