import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { withPauseWhenNotVisible } from "../navigation/withPauseWhenNotVisible";
import { useRapidlyUpdatingContext } from "../hooks/useRapidlyUpdatingContext";

const TabOneScreen = () => {
  const rapidlyUpdatingValue = useRapidlyUpdatingContext();
  const renderCount = React.useRef(0);

  renderCount.current++;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Rapidly updating value: {rapidlyUpdatingValue}</Text>
      <Text>Num renders: {renderCount.current}</Text>
    </View>
  );
};

export default withPauseWhenNotVisible(TabOneScreen);

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
