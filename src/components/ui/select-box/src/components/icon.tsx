import React, { memo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Polygon } from 'react-native-svg';

/**
 * Icon names available in the sprite‑sheet
 */
export type IconName =
  | 'downArrow'
  | 'upArrow'
  | 'deleteCircle'
  | 'searchBoxIcon'
  | 'addCircle'
  | 'closeCircle';

/**
 * Props accepted by <Icon />
 */
export interface IconProps {
  /** Which icon to render */
  name: IconName;
  /** Tint / stroke colour (falls back to blue) */
  fill?: string;
  /** Width override */
  width?: number;
  /** Height override */
  height?: number;
  /** Custom viewBox (rarely needed) */
  viewBox?: string;
  /** Any additional SVG props */
  [key: string]: unknown;
}

/** Hit‑tested, pointer‑events‑disabled SVG icon */
function Icon({
  name,
  fill,
  width,
  height,
  viewBox,
  ...otherProps
}: IconProps) {
  /** Inline SVG content for each glyph */
  const graphics: Record<
    IconName,
    { width: number; height: number; viewBox: string; content: JSX.Element }
  > = {
    downArrow: {
      width: 12,
      height: 9,
      viewBox: '0 0 12 9',
      content: (
        <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <Polygon fill={fill || '#4A90E2'} points="5.625 9 11.25 0 0 0" />
        </G>
      ),
    },
    upArrow: {
      width: 12,
      height: 9,
      viewBox: '0 0 12 9',
      content: (
        <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <Polygon
            fill={fill || '#4A90E2'}
            transform="translate(5.625000, 4.500000) rotate(-180.000000) translate(-5.625000, -4.500000)"
            points="5.625 9 11.25 0 0 0"
          />
        </G>
      ),
    },
    deleteCircle: {
      width: 22,
      height: 22,
      viewBox: '0 0 22 22',
      content: (
        <G fill="none" fillRule="evenodd">
          <Circle cx="10" cy="10" r="10" fill={fill || '#E02020'} />
          <Path stroke="#FFF" strokeWidth="2" d="M16.451 10.451H3.55" />
        </G>
      ),
    },
    searchBoxIcon: {
      width: width ?? 18,
      height: height ?? 16,
      viewBox: '0 0 18 16',
      content: (
        <G
          fill="none"
          fillRule="evenodd"
          stroke={fill || '#0575E6'}
          strokeWidth="1.2"
          transform="translate(1.4 1.16)"
        >
          <Ellipse cx="5.921" cy="6.178" rx="5.921" ry="6.178" />
          <Path d="M10.812 9.782L15.96 13.9" />
        </G>
      ),
    },
    addCircle: {
      width: 22,
      height: 22,
      viewBox: '0 0 22 22',
      content: (
        <G
          fill="none"
          fillRule="evenodd"
          stroke={fill || '#0575E6'}
          strokeWidth=".8"
          transform="translate(1 1)"
        >
          <Circle cx="10" cy="10" r="10" />
          <Path d="M10 3.2v12.903M16.451 9.651H3.55" />
        </G>
      ),
    },
    closeCircle: {
      width: width ?? 24,
      height: height ?? 20,
      viewBox: '0 0 23 23',
      content: (
        <G stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
          <G stroke={fill || '#0575E6'}>
            <Circle cx="11" cy="11" r="10" />
            <Path d="M5 10.5L16.8436 11" transform="rotate(-315 10.9218 11)" />
            <Path d="M5 10.5L16.8436 11" transform="rotate(-585 10.9218 11)" />
          </G>
        </G>
      ),
    },
  };

  const glyph = graphics[name];

  return (
    <View pointerEvents="none">
      <Svg
        width={width ?? glyph.width}
        height={height ?? glyph.height}
        viewBox={viewBox ?? glyph.viewBox}
        x={0}
        y={0}
        {...otherProps}
      >
        {glyph.content}
      </Svg>
    </View>
  );
}

export default memo(Icon);
