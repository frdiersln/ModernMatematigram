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
        <View style={{ height: '41vh' }}></View>  {/*Dummy view to push the draggable area down*/}
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
                  <Text numberOfLines={1} style={[styles.node, styles.nodeH1]}>YARI GRUP</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Bir G kümesi için ♢: GxG ➙ G işlemi tanımlı olsun.</Text>
                  <Text style={[styles.node, styles.nodeH2]}>(Asosyatiflik) G1: &nbsp; x♢(y♢z) = (x♢y)♢z,&nbsp; x,y,z∈G</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Aksiyomu sağlanıyorsa G bir Yarı Grup denir.</Text>
                </Animated.View>
                <Animated.View>
                  <Text style={[styles.node, styles.nodeH1]}>MONOİD</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Bir G kümesi için ♢: GxG ➙ G işlemi tanımlı olsun.</Text>
                  <Text style={[styles.node, styles.nodeH2]}>(Asosyatiflik) G1: &nbsp; x♢(y♢z) = (x♢y)♢z,&nbsp; x,y,z∈G</Text>
                  <Text style={[styles.node, styles.nodeH2]}>(Birimlilik) G2: &nbsp; Ɐx∈G için x♢e = x, e♢x = x&nbsp; olacak şekilde e birim elemanı bulunur</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Aksiyomları sağlanıyorsa G bir Monoid denir.</Text>
                </Animated.View>
                <Animated.View>
                  <Text style={[styles.node, styles.nodeH1]}>GRUP</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Bir G kümesi için ♢: GxG ➙ G işlemi tanımlı olsun.</Text>
                  <Text style={[styles.node, styles.nodeH2]}>(Asosyatiflik) G1: &nbsp; x♢(y♢z) = (x♢y)♢z,&nbsp; x,y,z∈G</Text>
                  <Text style={[styles.node, styles.nodeH2]}>(Birimlilik) G2: &nbsp; Ɐx∈G için x♢e = x, e♢x = x&nbsp; olacak şekilde bir e birim elemanı bulunur</Text>
                  <Text style={[styles.node, styles.nodeH2]}>(Tersinerlik) G3: &nbsp; Ɐx∈G için x♢x⁻¹ = e &nbsp; olacak şekilde ters elemanlar bulunur</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Aksiyomları sağlanıyorsa G bir Grup denir.</Text>
                </Animated.View>
                <Animated.View>
                  <Text style={[styles.node, styles.nodeH1]}>HALKA</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Bir H kümesi için ♢: HxH ➙ H ve ♦: HxH ➙ H işlemleri tanımlı olsun.</Text>
                  <Text style={[styles.node, styles.nodeH2]}>H1: &nbsp; H kümesi ♢ işlemi ile bir abelyen Grup belirtir</Text>
                  <Text style={[styles.node, styles.nodeH2]}>H2: &nbsp; x♦(y♦z) = (x♦y)♦z,&nbsp; x,y,z∈H</Text>
                  <Text style={[styles.node, styles.nodeH2]}>H3: &nbsp; x♦(y♢z) = (x♦y)♢(x♦z),&nbsp; x,y,z∈H</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Aksiyomları sağlanıyorsa H bir Halka denir.</Text>
                </Animated.View>
                <Animated.View>
                <Text style={[styles.node, styles.nodeH1]}>MODÜL</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Bir M kümesi ve R(✚, ☸) halkası için ✱: RxM ➙ M ve +: MxM ➙ M işlemleri tanımlı olsun.
                  {"\n"} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; (r,m)➙r✱m &emsp;&ensp; (m,m)↦r+m </Text>
                  <Text style={[styles.node, styles.nodeH2]}>M1: &nbsp; M kümesi + işlemi ile bir abelyen Grup belirtir</Text>
                  <Text style={[styles.node, styles.nodeH2]}>M2: &nbsp; r✱(m₁+m₂) = (r✱m₁)+(r✱m₂),&nbsp; m₁,m₂∈M, &nbsp; r∈R</Text>
                  <Text style={[styles.node, styles.nodeH2]}>M3: &nbsp; (r₁✚r₂)✱m = (r₁✱m)+(r₂✱m),&nbsp; r₁,r₂∈R, &nbsp; m∈M</Text>
                  <Text style={[styles.node, styles.nodeH2]}>M4: &nbsp; (r₁☸r₂)✱m = r₁✱(r₂✱m),&nbsp; r₁,r₂∈R, &nbsp; m∈M</Text>
                  <Text style={[styles.node, styles.nodeH2]}>Aksiyomları sağlanıyorsa M bir Modül denir.</Text>
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
    overflow: 'hidden',
  },
  draggableArea: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'tomato',
    width: '6666px',
  },
  node: {
    marginHorizontal: 89,
    marginVertical: 4,
    color: 'white',
    minWidth: 489,
  },
  nodeH1: {
    marginVertical: 14,
    fontSize: 41,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    textAlign: 'center',
  },
  nodeH2: {
    marginVertical: 4,
    fontSize: 22,
    fontWeight: 'semi-bold',
  },
});