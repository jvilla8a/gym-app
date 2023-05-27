import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CheckBox = (props) => {
  const { type = "radio", label, isChecked, onPress } = props;

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {type.toLowerCase() === "check" && (
          <Icon
            style={styles.icon}
            name={
              isChecked ? "checkbox-intermediate" : "checkbox-blank-outline"
            }
            color="#424242"
            size={24}
          />
        )}
        {type.toLowerCase() === "radio" && (
          <Icon
            style={styles.icon}
            name={isChecked ? "circle-slice-8" : "circle-outline"}
            color={isChecked ? "#4C00A4" : "#424242"}
            size={24}
          />
        )}
        <Text style={[styles.label, isChecked && styles.labelChecked]}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontFamily: "FiraL",
    fontSize: 16,
    color: "#424242",
  },
  labelChecked: {
    color: "#4C00A4",
  },
});

export default CheckBox;
