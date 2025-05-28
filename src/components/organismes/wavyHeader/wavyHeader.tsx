import React, { memo } from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {styles} from './wavyHeader.style';
import {lightBaseColor} from '../../../styles/formStyles';
import {useTheme} from '../../../contexts/themeContext';
const WavyHeader = () => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Shopfinity</Text>
      <View style={styles.upperContainer}>
        <Svg
          viewBox="0 0 1440 320"
          style={styles.wave}
          preserveAspectRatio="none">
          <Path
            fill={lightBaseColor}
            fillOpacity="1"
            d="M0,96L80,128C160,160,320,224,480,224C640,224,800,160,960,160C1120,160,1280,224,1360,256L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </Svg>
      </View>
      <View
        style={isAppDark ? styles.darkLowerContainer : styles.lowerContainer}>
        <Svg
          viewBox="0 0 1440 320"
          style={styles.wave}
          preserveAspectRatio="none">
          <Path
            fill={lightBaseColor}
            fillOpacity="1"
            d="M0,96L80,128C160,160,320,224,480,224C640,224,800,160,960,160C1120,160,1280,224,1360,256L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
};
export default memo(WavyHeader);
