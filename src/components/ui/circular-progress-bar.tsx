import { arc } from 'd3-shape';
import React from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Stop,
} from 'react-native-svg';

interface CircularProgressProps {
  size: number;
  width: number;
  fill: number; // 0-100
  style?: StyleProp<ViewStyle>;
  rotation?: number;
  backgroundColor?: string;
  gradientSteps: string[];
  children?: React.ReactNode;
}

const CircularProgressBar: React.FC<CircularProgressProps> = ({
  size,
  width,
  fill,
  style,
  rotation = 90,
  backgroundColor = '#e4e4e4',
  gradientSteps,
  children,
}) => {
  const radius = size / 2;
  const outerRadius = radius;
  const innerRadius = radius - width;
  const clampFill = Math.min(100, Math.max(0, fill));

  // Create arc path
  const angle = (clampFill / 100) * 2 * Math.PI;
  const arcPath = arc()({
    innerRadius,
    outerRadius,
    startAngle: 0,
    endAngle: angle,
  });

  // // Compute angles
  // const startAngle = 0;
  // const endAngle = angle;

  // // Cap radius
  // const capRadius = width / 2;

  // // Center point
  // const cx = radius;
  // const cy = radius;

  // // Average arc radius for cap placement
  // const avgRadius = (innerRadius + outerRadius) / 2;

  // // Get start cap position
  // const startX = cx + avgRadius * Math.cos(startAngle - Math.PI / 2);
  // const startY = cy + avgRadius * Math.sin(startAngle - Math.PI / 2);

  // // Get end cap position
  // const endX = cx + avgRadius * Math.cos(endAngle - Math.PI / 2);
  // const endY = cy + avgRadius * Math.sin(endAngle - Math.PI / 2);

  // // Interpolate cap colors from gradient
  // const interpolateColor = interpolateRgb(
  //   gradientSteps[0],
  //   gradientSteps[gradientSteps.length - 1]
  // );
  // const progressT = clampFill / 100;
  // const endCapColor = interpolateColor(progressT);
  // const startCapColor = interpolateColor(0); // always first color

  // Generate gradient stops
  const generateStops = () => {
    return gradientSteps.map((color, index) => {
      const offset = (index / (gradientSteps.length - 1)) * 100;
      return (
        <Stop
          key={`stop-${index}`}
          offset={`${offset}%`}
          stopColor={color}
          stopOpacity="1"
        />
      );
    });
  };

  return (
    <View style={style}>
      <Svg width={size} height={size}>
        <Defs>
          {/* Gradient */}
          <LinearGradient id="grad" x1="100%" y1="0%" x2="0%" y2="100%">
            {generateStops()}
          </LinearGradient>

          {/* Mask for progress arc */}
          <Mask id="mask">
            <Path x={radius} y={radius} d={arcPath!} fill="white" />
          </Mask>
        </Defs>

        {/* Background circle */}
        <G rotation={rotation} originX={radius} originY={radius}>
          <Path
            x={radius}
            y={radius}
            d={
              arc()({
                innerRadius,
                outerRadius,
                startAngle: 0,
                endAngle: 2 * Math.PI,
              })!
            }
            fill={backgroundColor}
          />

          {/* Gradient progress masked by arc shape */}
          <Circle
            cx={radius}
            cy={radius}
            r={radius}
            fill="url(#grad)"
            mask="url(#mask)"
          />

          {/* Rounded caps */}
          {/* {fill > 0 && (
            <>
              <Circle
                cx={startX}
                cy={startY}
                r={capRadius}
                fill={startCapColor}
              />
              <Circle cx={endX} cy={endY} r={capRadius} fill={endCapColor} />
            </>
          )} */}
        </G>
      </Svg>

      {/* Optional children overlay */}
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

export default CircularProgressBar;
