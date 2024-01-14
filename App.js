import React from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default function App() {
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const lastTranslateX = new Animated.Value(0);
  const lastTranslateY = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastTranslateX.setValue(lastTranslateX._value + event.nativeEvent.translationX);
      lastTranslateY.setValue(lastTranslateY._value + event.nativeEvent.translationY);
      translateX.setOffset(lastTranslateX._value);
      translateY.setOffset(lastTranslateY._value);
      translateX.setValue(0);
      translateY.setValue(0);
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                { translateX: translateX },
                { translateY: translateY },
              ],
            },
          ]}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Hello, World!</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});