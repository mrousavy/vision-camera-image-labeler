import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Animated, {
  DerivedValue,
  useAnimatedProps,
} from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({text: true});
const AnimatedText = Animated.createAnimatedComponent(TextInput);

export const Label = ({text}: {text: DerivedValue<string>}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
      defaultValue: text.value,
    };
  });

  return (
    <AnimatedText
      style={styles.text}
      editable={false}
      multiline={true}
      animatedProps={animatedProps}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: 48,
    padding: 4,
    marginHorizontal: 20,
    backgroundColor: '#000000CC',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
});
