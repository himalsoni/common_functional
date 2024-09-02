import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Color } from "@common";

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.lodarMainView}>
        <ActivityIndicator animating={true} size="large" style={styles.loader} color={Color.loaderColor} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  lodarMainView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  loaderIcon: {
    height: 280,
    width: 280,
  },
});

