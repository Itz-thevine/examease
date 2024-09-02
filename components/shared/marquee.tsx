import { combineStyles, height, width } from '@/lib';
import { GlobalStyles } from '@/styles';
import React, { useState } from 'react';
import { Button, StyleSheet, View, Image, LayoutChangeEvent, ImageSourcePropType } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';

interface MeasureElementProps {
  onLayout: (width: number) => void;
  children: React.ReactNode;
}

const MeasureElement: React.FC<MeasureElementProps> = ({ onLayout, children }) => (
  <Animated.ScrollView
    horizontal
    style={marqueeStyles.hidden}
    pointerEvents="box-none">
    <View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
      {children}
    </View>
  </Animated.ScrollView>
);

interface TranslatedElementProps {
  index: number;
  children: React.ReactNode;
  offset: Animated.SharedValue<number>;
  childrenWidth: number;
}

const TranslatedElement: React.FC<TranslatedElementProps> = ({ index, children, offset, childrenWidth }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: (index - 1) * childrenWidth,
      transform: [
        {
          translateX: -offset.value,
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.animatedStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const getIndicesArray = (length: number) => Array.from({ length }, (_, i) => i);

interface ClonerProps {
  count: number;
  renderChild: (index: number) => JSX.Element;
}

const Cloner: React.FC<ClonerProps> = ({ count, renderChild }) => (
  <>{getIndicesArray(count).map(renderChild)}</>
);

interface ChildrenScrollerProps {
  duration: number;
  childrenWidth: number;
  parentWidth: number;
  reverse: boolean;
  children: React.ReactNode[];
}

const ChildrenScroller: React.FC<ChildrenScrollerProps> = ({
  duration,
  childrenWidth,
  parentWidth,
  reverse,
  children,
}) => {
  const offset = useSharedValue(0);
  const coeff = useSharedValue(reverse ? 1 : -1);

  React.useEffect(() => {
    coeff.value = reverse ? 1 : -1;
  }, [reverse]);

  useFrameCallback((i) => {
    offset.value += (coeff.value * ((i.timeSincePreviousFrame ?? 1) * childrenWidth)) / duration;
    offset.value = offset.value % childrenWidth;
  }, true);

  const count = Math.round(parentWidth / childrenWidth) + 2;
  const renderChild = (index: number) => (
    <TranslatedElement
      key={`clone-${index}`}
      index={index}
      offset={offset}
      childrenWidth={childrenWidth}>
      {children[index % children.length]}
    </TranslatedElement>
  );

  return <Cloner count={count} renderChild={renderChild} />;
};

interface MarqueeProps {
  duration?: number;
  reverse?: boolean;
  images: ImageSourcePropType[];
  style?: object;
}

const Marquee: React.FC<MarqueeProps> = ({ duration = 2000, reverse = false, images, style }) => {
  const [parentWidth, setParentWidth] = React.useState(0);
  const [childrenWidth, setChildrenWidth] = React.useState(0);

  return (
    <View
      style={style}
      onLayout={(ev: LayoutChangeEvent) => {
        setParentWidth(ev.nativeEvent.layout.width);
      }}
      pointerEvents="box-none">
      <View style={marqueeStyles.row} pointerEvents="box-none">
        <MeasureElement onLayout={setChildrenWidth}>
          {images.map((source, index) => (
            <Image key={index} source={source} style={styles.image} resizeMode='contain'/>
          ))}
        </MeasureElement>

        {childrenWidth > 0 && parentWidth > 0 && (
          <ChildrenScroller
            duration={duration}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            reverse={reverse}
            children={images.map((source, index) => (
              <Image key={index} source={source} style={styles.image} />
            ))}>
          </ChildrenScroller>
        )}
      </View>
    </View>
  );
};

const marqueeStyles = StyleSheet.create({
  hidden: { opacity: 0, zIndex: -1 },
  row: { flexDirection: 'row', overflow: 'hidden' },
});

interface iMarqueeScreen  {
    images : ImageSourcePropType[]
}

const MarqueeScreen: React.FC<iMarqueeScreen> = ({images}) => {
  const [reverse, setReverse] = useState(false);

  return (
    <View style={[combineStyles(GlobalStyles, 'safeArea'), { width }]}>
      <View style={combineStyles(GlobalStyles)}>
        {/* <Button onPress={() => setReverse((v) => !v)} title="Reverse" /> */}
        <Marquee reverse={reverse} images={images} style={{height: 40, marginVertical: 10, resizeMode: 'contain'}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 30,
    marginRight: 80,
  },
  container: {
    flex: 1,
    width,
  },
  safeArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  animatedStyle: {
    position: 'absolute',
  },
  circle: {
    marginTop: 4,
    borderRadius: 100,
    height: 120,
    width: 160,
    backgroundColor: '#b58df1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MarqueeScreen;
