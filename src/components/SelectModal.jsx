import React, { useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BottomSheet from "@gorhom/bottom-sheet";

const SelectModal = (props) => {
  const { options, value, onChange, onClose } = props;
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleOnClose = () => {
    onClose([]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={handleOnClose}
    >
      <View style={styles.container}>
        <Picker
          selectedValue={value}
          onValueChange={(val) => onChange("variation", val)}
        >
          <Picker.Item
            label="Elige una variación..."
            enabled={false}
            value={null}
          />
          {[...options].map((item) => (
            <Picker.Item
              label={item}
              value={item}
              key={item.toLowerCase().replace(/\s+/g, "")}
            />
          ))}
          <Picker.Item label="Otra variación" value="other" />
        </Picker>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
    height: 500,
  },
});

export default SelectModal;
