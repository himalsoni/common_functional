import React from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import { isObject } from "lodash";
import { connect } from "react-redux";
import { Styles } from "@common";
import { EventEmitter } from "@common/Tools";

export class MyToast extends React.Component {
  constructor(props) {
    super(props);
    this.nextToastId = 0;
    this.renderToast = this.renderToast.bind(this);
  }

  componentDidMount() {
    this.toastListener = EventEmitter.addListener(
      'toast',
      this.doToast.bind(this)
    );
  }

  componentWillUnmount() {
    this.toastListener.remove();
  }

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  render() {
    const { toast } = this.props;
    return (
      <View style={styles.container}>{toast.list.map(this.renderToast)}</View>
    );
  }

  renderToast(msg, index: number) {
    if ((msg && !msg.msg) || (msg && isObject(msg.msg))) { return null }

    const { removeToast } = this.props;
    const onPress = () => removeToast(msg.key);
    // console.log('----------msg.key----------->>>>> ' + msg.key)
    return (
      <TouchableOpacity key={index} style={styles.textWrap} onPress={onPress}>
        <Text style={styles.text}>{msg.msg}</Text>
      </TouchableOpacity>
    );
  }

  doToast(msg, duration = 6000) {
    const { addToast, removeToast } = this.props;
    const key = this.nextToastId++; // unique message key
    addToast(msg, key);
    setTimeout(() => removeToast(key), duration);
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // top: Styles.height*0.2, // padding top
    bottom: Styles.height*0.2, // padding top
    left: Styles.width / 20,
    right: Styles.width / 20, // padding horizontal
    alignItems: "center",
    zIndex: 9999,
  },
  textWrap: {
    backgroundColor: "rgba(60,60,60,1)",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
  },
  text: {
    color: "#FFFFFF",
  },
});

const mapStateToProps = (state) => {
  return {
    toast: state.toast,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/ToastRedux");
  return {
    addToast: (msg, key) => dispatch(actions.addToast(msg, key)),
    removeToast: (msg) => dispatch(actions.removeToast(msg)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyToast);
