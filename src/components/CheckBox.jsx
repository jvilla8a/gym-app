import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CheckBox = (props) => {
  const { type = 'radio', label, isChecked, onPress } = props;

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {type.toLowerCase() === 'check' && <Icon style={styles.icon} name={isChecked ? 'checkbox-intermediate' : 'checkbox-blank-outline'} color='#424242' size={24} />}
        {type.toLowerCase() === 'radio' && <Icon style={styles.icon} name={isChecked ? 'circle-slice-8' : 'circle-outline'} color='#424242' size={24} />}
        <Text>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  icon: {
    marginRight: 4,
  }
});

export default CheckBox;