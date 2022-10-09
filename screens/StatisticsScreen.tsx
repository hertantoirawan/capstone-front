import { StyleSheet, Dimensions, ScrollView } from "react-native";

import { Text, View } from "../components/Themed";
import { BarChart, ContributionGraph } from "react-native-chart-kit";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const contributions = [
  { date: "2019-01-02", count: 1 },
  { date: "2019-01-03", count: 2 },
  { date: "2019-01-04", count: 3 },
  { date: "2019-01-05", count: 4 },
  { date: "2019-01-06", count: 5 },
  { date: "2019-01-30", count: 2 },
  { date: "2019-01-31", count: 3 },
  { date: "2019-03-01", count: 2 },
  { date: "2019-04-02", count: 4 },
  { date: "2019-03-05", count: 2 },
  { date: "2019-02-30", count: 4 },
];

const chartConfig = {
  backgroundColor: "white",
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const handleToolTip: any = {};

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <BarChart
            data={data}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>
        <View>
          <BarChart
            data={{
              labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width - 50} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              color: (opacity = 1) => `black`,
              labelColor: (opacity = 1) => `black`,
              barPercentage: 1,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View>
          <ContributionGraph
            values={contributions}
            endDate={new Date("2019-04-01")}
            numDays={105}
            width={Dimensions.get("window").width - 16}
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            tooltipDataAttrs={(value) => handleToolTip}
          />
        </View>
      </ScrollView>
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
});
