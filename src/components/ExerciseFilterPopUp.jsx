import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import CheckBox from "./CheckBox";
// TODO: Echar un ojo al filtro de Record
const BottomPopup = (props) => {
  const {
    isVisible,
    currentFilter,
    addFilter,
    onClose,
    variation,
    cleanFilter,
  } = props;

  const [filter, setFilter] = useState(currentFilter);

  const handleOnClose = () => {
    onClose(false);
    setFilter("");
  };

  const handleCleanFilter = () => {
    setFilter("");
    cleanFilter();
  };

  const handleAddFilter = () => {
    console.log("HERE");
    addFilter(filter);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleOnClose}
    >
      <TouchableWithoutFeedback onPress={handleOnClose}>
        <View style={styles.modalBackground}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={handleOnClose}
          >
            <Icon name="close" color="#D3D3D3" size={30} />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Filtros</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={
                    filter || filter !== currentFilter ? handleAddFilter : null
                  }
                >
                  <Text
                    style={[
                      styles.buttonLabel,
                      (!filter || filter === currentFilter) &&
                        styles.buttonLabelDisabled,
                    ]}
                  >
                    Aplicar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={currentFilter ? handleCleanFilter : null}
                >
                  <Text
                    style={[
                      styles.buttonLabel,
                      !currentFilter && styles.buttonLabelDisabled,
                    ]}
                  >
                    Limpiar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={styles.listContainer}>
              {["No Variación", ...variation].map((item, index) => (
                <CheckBox
                  key={index}
                  label={item}
                  onPress={() => setFilter(filter === item ? "" : item)}
                  isChecked={filter === item}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = {
  modalBackground: {
    flex: 1,
    backgroundColor: "#4242427F",
    justifyContent: "flex-end",
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    padding: 12,
  },
  modalContent: {
    maxHeight: 400,
    backgroundColor: "#F5F5F5",
    padding: 16,
    paddingBottom: 24,
  },
  title: {
    fontFamily: "FiraM",
    fontSize: 24,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#424242",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  listContainer: {
    paddingTop: 8,
  },
  button: {
    marginLeft: 16,
  },
  buttonLabel: {
    fontFamily: "FiraR",
    color: "#4C00A4",
    fontSize: 16,
  },
  buttonLabelDisabled: {
    color: "#858585",
  },
};

export default BottomPopup;
