import React, { useMemo } from 'react';
import getSplitLineSegments, { LineSegmentation } from '../util/getSplitLineSegments';
import { line } from '../util/D3ShapeFactories';
import { LinePathConfig } from '../types';
import LinePath from './LinePath';

interface Point {
  x: number;
  y: number;
}

const getX = (d: Point) => d.x || 0;
const getY = (d: Point) => d.y || 0;

export type SplitLinePathChildren = (renderProps: {
  index: number;
  segment: { x: number; y: number }[];
  styles?: Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'children'>;
}) => React.ReactNode;

export type SplitLinePathProps<Datum> = {
  segmentation?: LineSegmentation;
  /** Array of data segments, where each segment will be a separate path in the rendered line. */
  segments: Datum[][];
  /** Styles to apply to each segment. If fewer styles are specified than the number of segments, they will be re-used. */
  styles: Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'children'>[];
  /** Override render function which is passed the configured path generator as input. */
  children?: SplitLinePathChildren;
  /** className applied to path element. */
  className?: string;
  /** Optionally specify the sample rate for interpolating line segments. */
  sampleRate?: number;
} & LinePathConfig<Datum>;

export default function SplitLinePath<Datum>({
  children,
  className,
  curve,
  defined,
  segmentation = 'x',
  sampleRate,
  segments,
  x,
  y,
  styles,
}: SplitLinePathProps<Datum>) {
  const pointsInSegments = useMemo(() => {
    const xFn = typeof x === 'number' || typeof x === 'undefined' ? () => x : x;
    const yFn = typeof y === 'number' || typeof y === 'undefined' ? () => y : y;
    return segments.map(s => s.map((value, i) => ({ x: xFn(value, i, s), y: yFn(value, i, s) })));
  }, [x, y, segments]);

  const pathString = useMemo(() => {
    const path = line<Datum>({ x, y, defined, curve });
    return path(segments.flat()) || '';
  }, [x, y, defined, curve, segments]);

  const splitLineSegments = useMemo(
    () =>
      getSplitLineSegments({
        // use entire path to interpolate individual segments
        path: pathString,
        segmentation,
        pointsInSegments,
        sampleRate,
      }),
    [pathString, segmentation, pointsInSegments, sampleRate],
  );

  return splitLineSegments.map((segment, index) =>
    children ? (
      children({ index, segment, styles: styles[index] || styles[index % styles.length] })
    ) : (
      <LinePath
        key={index}
        className={className}
        data={segment}
        x={getX}
        y={getY}
        {...(styles[index] || styles[index % styles.length])}
      />
    ),
  );
}
