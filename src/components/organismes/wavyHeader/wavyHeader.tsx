import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const WavyHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Shopfinity</Text>
      <Svg
        height="160"
        width="100%"
        viewBox="0 0 1440 400"
        style={styles.topWave}>
        <Path
          fill="#00FF40"
          d="M0,150 C150,100 300,200 450,150 C600,100 750,200 900,150 C1050,100 1200,200 1350,150 C1400,130 1440,100 1440,100 L1440,0 L0,0 Z"
        />
      </Svg>
      <Svg
        height="160"
        width="100%"
        viewBox="0 0 1440 400"
        style={styles.bottomWave}>
        <Path
          fill="#00FF40"
          d="M0,250 C150,300 300,200 450,250 C600,300 750,200 900,250 C1050,300 1200,200 1350,250 C1400,270 1440,300 1440,300 L1440,400 L0,400 Z"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: '25%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#318555',
  },
  headerText: {
    position: 'absolute',
    top: '35%',
    fontSize: 40,
    fontFamily: 'Sansation-BoldItalic',
    color: '#223a66',
    alignSelf: 'center',
    zIndex: 1,
  },
  topWave: {
    position: 'absolute',
    top: 60,
    left: 0,
    width: '100%',
    height: 'auto',
  },
  bottomWave: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    width: '100%',
    height: 'auto',
  },
});

export default WavyHeader;
