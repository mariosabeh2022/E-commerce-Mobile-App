import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const {width} = Dimensions.get('window');

const WavyHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Svg height="160" width={width} viewBox="0 0 1440 320">
          <Path
            fill="#318544"
            d="M0,160L48,154.7C96,149,192,139,288,138.7C384,139,480,149,576,138.7C672,128,768,96,864,80C960,64,1056,64,1152,90.7C1248,117,1344,171,1392,197.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00ff40',
  },
  header: {
    backgroundColor: '#00ff40',
    height: 200,
    justifyContent: 'flex-end',
  },
});

export default WavyHeader;
