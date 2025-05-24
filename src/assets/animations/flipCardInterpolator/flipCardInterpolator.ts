import {
  StackCardInterpolationProps,
  StackCardInterpolatedStyle,
} from '@react-navigation/stack';
import {Animated} from 'react-native';

export const flipCardInterpolator = ({
  current,
  next,
}: StackCardInterpolationProps): StackCardInterpolatedStyle => {
  // Use the progress of the transition (next if available, else current)
  const progress = next ? next.progress : current.progress;

  return {
    cardStyle: {
      backfaceVisibility: 'hidden',
      transform: [
        {
          rotateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '0deg'], // Flip from 180deg to 0deg
          }) as Animated.AnimatedInterpolation<string>,
        },
      ],
    },
    overlayStyle: undefined,
    shadowStyle: undefined,
    containerStyle: undefined,
  };
};
