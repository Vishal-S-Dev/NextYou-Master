import { interpolateRgb } from 'd3-interpolate';
import { arc } from 'd3-shape';
import React from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

interface CircularProgressProps {
  size: number;
  width: number;
  fill: number; // 0-100
  style?: StyleProp<ViewStyle>;
  rotation?: number;
  backgroundColor?: string;
  gradientSteps: string[]; // Must be >= 2
  children?: React.ReactNode;
  isStartRoundedCap?: boolean;
  isEndRoundedCap?: boolean;
  endRoundedCapColor?: string;
}

const SEGMENTS = 100; // Higher = smoother gradient

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  width,
  fill,
  style,
  rotation = 90,
  backgroundColor = '#e4e4e4',
  gradientSteps,
  children,
  isStartRoundedCap = true,
  isEndRoundedCap = true,
  endRoundedCapColor = '#EB8468',
}) => {
  const clampFill = Math.min(100, Math.max(0, fill));
  // const animatedFill = useSharedValue(0);
  // const [segmentsToDraw, setSegmentsToDraw] = useState(0);

  // useEffect(() => {
  //   animatedFill.value = withTiming(clampFill, { duration: 1000 });
  // }, [clampFill]);
  // //const fillAngle = (clampFill / 100) * 2 * Math.PI;

  // useAnimatedReaction(
  //   () => animatedFill.value,
  //   (val) => {
  //     const seg = Math.floor((val / 100) * SEGMENTS);
  //     runOnJS(setSegmentsToDraw)(seg);
  //   },
  //   []
  // );

  // Convert gradient steps to interpolated color array
  const generateColors = (steps: string[], total: number) => {
    const colors: string[] = [];
    const segmentsPerStep = total / (steps.length - 1);

    for (let i = 0; i < steps.length - 1; i++) {
      const interpolator = interpolateRgb(steps[i], steps[i + 1]);
      for (let j = 0; j < segmentsPerStep; j++) {
        const t = j / segmentsPerStep;
        colors.push(interpolator(t));
      }
    }
    return colors;
  };

  const gradientColors = generateColors(gradientSteps, SEGMENTS);

  const radius = size / 2;
  const outerRadius = radius;
  const innerRadius = radius - width;

  const renderBackground = () => {
    const backgroundPath = arc()({
      innerRadius,
      outerRadius,
      startAngle: 0,
      endAngle: 2 * Math.PI,
    });

    return (
      <Path x={radius} y={radius} d={backgroundPath!} fill={backgroundColor} />
    );
  };

  const renderArcs = () => {
    const paths = [];
    const anglePerSegment = (2 * Math.PI) / SEGMENTS;
    const segmentsToDraw = Math.floor((clampFill / 100) * SEGMENTS);

    let startAngle = 0;
    let endAngle = 0;

    for (let i = 0; i < segmentsToDraw; i++) {
      startAngle = i * anglePerSegment;
      endAngle = (i + 1) * anglePerSegment;

      const arcPath = arc()({
        startAngle,
        endAngle,
        innerRadius,
        outerRadius,
      });

      paths.push(
        <Path
          key={`seg-${i}`}
          x={radius}
          y={radius}
          d={arcPath!}
          fill={gradientColors[i]}
        />
      );
    }

    // 🟢 Rounded start cap (optional)
    if (isStartRoundedCap && segmentsToDraw > 0 && clampFill > 0) {
      const avgRadius = (innerRadius + outerRadius) / 2;
      const capRadius = width / 2;

      const startX = radius + avgRadius * Math.cos(0 - Math.PI / 2); // 0 angle
      const startY = radius + avgRadius * Math.sin(0 - Math.PI / 2);

      paths.push(
        <Circle
          key="cap-start"
          cx={startX}
          cy={startY}
          r={capRadius}
          fill={gradientColors[0]}
        />
      );
    }

    // 🔵 Rounded end cap
    if (isEndRoundedCap && segmentsToDraw > 0 && clampFill <= 100) {
      const avgRadius = (innerRadius + outerRadius) / 2;
      const capRadius = width / 2;

      const endX = radius + avgRadius * Math.cos(endAngle - Math.PI / 2);
      const endY = radius + avgRadius * Math.sin(endAngle - Math.PI / 2);

      paths.push(
        <Circle
          key="cap-end"
          cx={endX}
          cy={endY}
          r={capRadius}
          fill={
            endRoundedCapColor
              ? endRoundedCapColor
              : gradientColors[segmentsToDraw - 1]
          }
        />
      );
    }
    return paths;
  };

  return (
    <View style={style}>
      <Svg width={size} height={size}>
        <G rotation={rotation} originX={size / 2} originY={size / 2}>
          {renderBackground()}
          {renderArcs()}
        </G>
      </Svg>
      {children && (
        <View style={[StyleSheet.absoluteFillObject, styles.center]}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CircularProgress;
