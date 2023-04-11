import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

function ExerciseCard(props) {
  const { exercise: { item }, handleNavigation } = props;

  return (
    <TouchableOpacity onPress={() => handleNavigation({ exerciseId: item.id })}>
      <View style={[styles.container, styles[item.muscleGroup.toLowerCase()]]}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.muscleGroup}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
  },
  brazo: {
    borderColor: '#DC143C'
  },
  espalda: {
    borderColor: '#3CB371'
  },
  hombro: {
    borderColor: '#9370DB'
  },
  pecho: {
    borderColor: '#DAA520'
  },
  pierna: {
    borderColor: '#1E90FF'
  },
});

export default ExerciseCard;