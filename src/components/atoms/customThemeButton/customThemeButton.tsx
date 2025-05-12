import React, {useEffect, useState} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './customThemeButton.style';
import {useTheme} from '../../../contexts/themeContext';
import CustomIcon from '../customIcon/customIcon';

export default function GradientSwitch() {
  const {theme, toggleTheme} = useTheme();
  const isAppDark = theme === 'dark';

  const initialTranslateX = isAppDark ? 24 : 0;
  const [translateX] = useState(new Animated.Value(initialTranslateX));

  useEffect(() => {
    const toValue = isAppDark ? 24 : 0;
    Animated.timing(translateX, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isAppDark, translateX]);

  const gradientColors = ['#00ff40', '#318555', '#223a66'];

  return (
    <TouchableOpacity onPress={toggleTheme} activeOpacity={0.8}>
      <LinearGradient
        colors={gradientColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.track}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{translateX}],
            },
          ]}>
          <CustomIcon type={isAppDark ? 'moon' : 'sun'} />
        </Animated.View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
