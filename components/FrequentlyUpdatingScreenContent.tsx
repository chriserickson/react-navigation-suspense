import * as React from "react";
import { useRapidlyUpdatingContext } from "../hooks/useRapidlyUpdatingContext";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";

export const FrequentlyUpdatinScreenContent = ({ label }: { label: string }) => {
  const rapidlyUpdatingValue = useRapidlyUpdatingContext();
  const renderCount = React.useRef(0);

  renderCount.current++;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Rapidly updating value: {rapidlyUpdatingValue}</Text>
      <Text>Num renders: {renderCount.current}</Text>
    </View>
  );
};

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
