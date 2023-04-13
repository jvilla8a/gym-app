import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BlockCard = (props) => {
  const { block: { variation, date, series }, current } = props;

  return (
    <View style={[styles.container, !current && styles.containerVertical]}>
      {!current && (
        <View style={styles.indicators}>
          <Text style={styles.indicatorsItem}>{series[0].weightKg ? 'Kg' : 'Lb'}</Text>
          <Text style={styles.indicatorsItem}>Rep</Text>
        </View>
      )}
      <View style={[styles.weightsContainer, !current && styles.vertical]}>
        {series.map((item, index) => ( current ?
          <View key={index} style={[styles.weightContainer, series.length-1 === index && styles.lastItem]}>
            <Text style={styles.title}>{`${item.weight} ${item.weightKg ? 'Kg' : 'Lb'}`}</Text>
            <Text style={styles.subtitle}>{`${item.reps} Rps`}</Text>
          </View> : 
          <View key={index} style={styles.weightDetails}>
            <Text style={styles.weightDetailsItem}>{item.weight}</Text>
            <Text>|</Text>
            <Text style={styles.weightDetailsItem}>{item.reps}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.blockFooter, current && styles.blockFooterHorizontal]}>
        <Text style={[styles.variation, current && styles.variationHorizontal]}>{`${variation ? `${variation} ${current ? `|` : ''}` : ''}`}</Text>
        <Text style={styles.date}>{`${date.seconds ? date.toDate().toLocaleDateString() : date.toLocaleDateString()}${current ? ' - ' : ''}`}</Text>
        <Text style={styles.time}>{date.seconds ? date.toDate().toLocaleTimeString() : date.toLocaleTimeString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  containerVertical: {
    maxWidth: 125,
  },
  weightsContainer: {
    minHeight: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    padding: 0,
  },
  vertical: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  weightContainer: {
    paddingRight: 8,
    marginRight: 8,
    borderColor: '#D3D3D3',
    borderStyle: 'solid',
    borderRightWidth: 1,
  },
  lastItem: {
    paddingRight: 0,
    marginRight: 0,
    borderRightWidth: 0,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#424242'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#858585'
  },
  variation: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#858585',
    fontSize: 12,
  },
  variationHorizontal: {
    marginBottom: 0,
    marginRight: 8,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 12,
  },
  indicatorsItem: {
    color: '#858585',
    fontSize: 20,
    fontWeight: 'bold',
  },
  weightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weightDetailsItem: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  date: {
    color: '#858585',
    textAlign: 'center',
  },
  time: {
    color: '#858585',
    textAlign: 'center',
  },
  blockFooter: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    justifyContent: 'center',
  },
  blockFooterHorizontal: {
    flexDirection: 'row',
  },
})

export default BlockCard;
