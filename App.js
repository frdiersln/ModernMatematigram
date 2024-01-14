import React from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';

export default function App() {
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const lastTranslateX = new Animated.Value(0);
  const lastTranslateY = new Animated.Value(0);
  const scale = new Animated.Value(1);
  const lastScale = new Animated.Value(1);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: false }
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

  const onPinchGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          scale: scale,
        },
      },
    ],
    { useNativeDriver: false }
  );

  const onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.setValue(lastScale._value * event.nativeEvent.scale);
      scale.setValue(lastScale._value);
    }
  };

  const onDoubleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      if (scale._value === 1) {
        scale.setValue(2);
        lastScale.setValue(1);
      }
      else {
        scale.setValue(1);
        lastScale.setValue(1);
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <PinchGestureHandler
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={onPinchHandlerStateChange}
          >
            <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
              <Animated.View
                style={[
                  styles.draggableArea,
                  {
                    transform: [
                      { translateX: translateX },
                      { translateY: translateY },
                      { scale: scale },
                    ],
                  },
                ]}
              >
                
                <Animated.View>
                  <Text style={[styles.node, styles.nodeH1]}>MONOİD</Text>
                </Animated.View>
                <Animated.View>
                  <Text style={[styles.node, styles.nodeH1]}>YARI GRUP</Text>
                </Animated.View>
                <Animated.View>
                  <Text style={[styles.node, styles.nodeH1]}>GRUP</Text>
                </Animated.View>
                <Animated.View>
                  <Text style={[styles.node, styles.nodeH1]}>HALKA</Text>
                </Animated.View>
                <Animated.View>
                  <Text style={[styles.node, styles.nodeH1]}>MODÜL</Text>
                </Animated.View>

              </Animated.View>
            </TapGestureHandler>
          </PinchGestureHandler>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  draggableArea: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,  },
  node: {
    margin: 66,
    color: 'white',
  },
  nodeH1: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});