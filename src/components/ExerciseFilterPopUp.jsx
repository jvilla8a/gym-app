import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CheckBox from './CheckBox';

const BottomPopup = (props) => {
  const { isVisible, currentFilter, addFilter, onClose, variation, cleanFilter } = props;

  const [filter, setFilter] = useState(currentFilter);

  const handleOnClose = () => {
    onClose(false);
    setFilter('');
  };

  const handleCleanFilter = () => {
    setFilter('');
    cleanFilter();
  };

  const handleAddFilter = () => {
    addFilter(filter);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={handleOnClose}
    >
      <View style={styles.modalBackground}>
        <TouchableOpacity style={styles.modalCloseButton} onPress={handleOnClose}>
          <Icon name='close' color='#D3D3D3' size={30} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Filtros</Text>
            <View style={styles.buttonsContainer}>
              <Button color='#4C00A4' onPress={handleAddFilter} title='Aplicar' disabled={!filter || filter === currentFilter} />
              <Button color='#4C00A4' onPress={handleCleanFilter} title='Limpiar' disabled={!currentFilter} />
            </View>
          </View>
          <ScrollView style={styles.listContainer}>
            {['No Variación', ...variation].map((item, index) => (
              <CheckBox
              key={index}
              label={item}
              onPress={() => setFilter(filter === item ? '' : item)}
              isChecked={filter === item}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalBackground: {
    flex: 1,
    backgroundColor: '#4242427F',
    justifyContent: 'flex-end',
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  modalContent: {
    maxHeight: 400,
    backgroundColor: '#F5F5F5',
    padding: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#424242'
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  listContainer: {
    paddingTop: 8,
  },
};

export default BottomPopup;
