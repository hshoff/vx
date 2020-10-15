import React, { useContext, useCallback, useMemo, useEffect } from 'react';
import { PositionScale } from '@visx/shape/lib/types';
import { scaleBand } from '@visx/scale';
import isChildWithProps from '../../../typeguards/isChildWithProps';
import { BaseBarSeriesProps } from './BaseBarSeries';
import { BarsProps, DataContextType } from '../../../types';
import DataContext from '../../../context/DataContext';
import getScaleBandwidth from '../../../utils/getScaleBandwidth';
import isValidNumber from '../../../typeguards/isValidNumber';
import findNearestDatumY from '../../../utils/findNearestDatumY';
import findNearestDatumX from '../../../utils/findNearestDatumX';
import useEventEmitter, { HandlerParams } from '../../../hooks/useEventEmitter';
import TooltipContext from '../../../context/TooltipContext';

export type BaseBarGroupProps<XScale extends PositionScale, YScale extends PositionScale> = {
  /** Whether to render the Stack horizontally instead of vertically. */
  horizontal?: boolean;
  /** `BarSeries` elements */
  children: JSX.Element | JSX.Element[];
  /** Group band scale padding, [0, 1] where 0 = no padding, 1 = no bar. */
  padding?: number;
  /** Comparator function to sort `dataKeys` within a bar group. By default the DOM rendering order of `BarGroup`s `children` is used. */
  sortBars?: (dataKeyA: string, dataKeyB: string) => number;
  /** Rendered component which is passed BarsProps by BaseBarSeries after processing. */
  BarsComponent: React.FC<BarsProps<XScale, YScale>>;
};

export default function BaseBarGroup<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object
>({
  children,
  horizontal,
  padding = 0.1,
  sortBars,
  BarsComponent,
}: BaseBarGroupProps<XScale, YScale>) {
  const {
    xScale,
    yScale,
    colorScale,
    dataRegistry,
    registerData,
    unregisterData,
    width,
    height,
  } = (useContext(DataContext) as unknown) as DataContextType<XScale, YScale, Datum>;

  const barSeriesChildren = useMemo(
    () =>
      React.Children.toArray(children).filter(child =>
        isChildWithProps<BaseBarSeriesProps<XScale, YScale, Datum>>(child),
      ),
    [children],
  ) as React.ReactElement<BaseBarSeriesProps<XScale, YScale, Datum>>[];

  // extract data keys from child series
  const dataKeys: string[] = useMemo(
    () => barSeriesChildren.map(child => child.props.dataKey ?? '').filter(key => key),
    [barSeriesChildren],
  );

  // register all child data
  useEffect(() => {
    const dataToRegister = barSeriesChildren.map(child => {
      const { dataKey: key, data, xAccessor, yAccessor } = child.props;
      return { key, data, xAccessor, yAccessor };
    });

    registerData(dataToRegister);
    return () => unregisterData(dataKeys);
  }, [registerData, unregisterData, barSeriesChildren, dataKeys]);

  // create group scale
  const groupScale = useMemo(
    () =>
      scaleBand<string>({
        domain: sortBars ? [...dataKeys].sort(sortBars) : dataKeys,
        range: [0, getScaleBandwidth(horizontal ? yScale : xScale)],
        padding,
      }),
    [sortBars, dataKeys, xScale, yScale, horizontal, padding],
  );

  const { showTooltip, hideTooltip } = useContext(TooltipContext) ?? {};
  const handleMouseMove = useCallback(
    (params?: HandlerParams) => {
      const { svgPoint } = params || {};
      // invoke showTooltip for each key so all data is available in context,
      // and let Tooltip find the nearest point among them
      dataKeys.forEach(key => {
        const entry = dataRegistry.get(key);
        if (entry && svgPoint && width && height && showTooltip) {
          const datum = (horizontal ? findNearestDatumY : findNearestDatumX)({
            point: svgPoint,
            data: entry.data,
            xScale,
            yScale,
            xAccessor: entry.xAccessor,
            yAccessor: entry.yAccessor,
            width,
            height,
          });
          if (datum) {
            showTooltip({
              key,
              ...datum,
              svgPoint,
            });
          }
        }
      });
    },
    [dataKeys, dataRegistry, horizontal, xScale, yScale, width, height, showTooltip],
  );
  useEventEmitter('mousemove', handleMouseMove);
  useEventEmitter('mouseout', hideTooltip);

  const registryEntries = dataKeys.map(key => dataRegistry.get(key));

  // if scales and data are not available in the registry, bail
  if (registryEntries.some(entry => entry == null) || !xScale || !yScale || !colorScale) {
    return null;
  }

  const [xMin, xMax] = xScale.range().map(Number);
  const [yMax, yMin] = yScale.range().map(Number);

  // try to figure out the 0 baseline for correct rendering of negative values
  // we aren't sure if these are numeric scales or not ahead of time
  const maybeXZero = xScale(0) ?? 0;
  const maybeYZero = yScale(0) ?? 0;
  const xZeroPosition = isValidNumber(maybeXZero)
    ? // if maybeXZero _is_ a number, but the scale is not clamped and it's outside the domain
      // fallback to the scale's minimum
      Math.max(maybeXZero, Math.min(xMin, xMax))
    : Math.min(xMin, xMax);
  const yZeroPosition = isValidNumber(maybeYZero)
    ? Math.min(maybeYZero, Math.max(yMin, yMax))
    : Math.max(yMin, yMax);

  const barThickness = getScaleBandwidth(groupScale);

  const bars = registryEntries.flatMap(({ xAccessor, yAccessor, data, key }) =>
    data.map((datum, index) => {
      const barLength = horizontal
        ? (xScale(xAccessor(datum)) ?? 0) - xZeroPosition
        : (yScale(yAccessor(datum)) ?? 0) - yZeroPosition;

      const groupPosition = (horizontal ? yScale(yAccessor(datum)) : xScale(xAccessor(datum))) ?? 0;

      const withinGroupPosition = groupScale(key) ?? 0;

      return {
        key: `${key}-${index}`,
        x: horizontal
          ? xZeroPosition + Math.min(0, barLength)
          : groupPosition + withinGroupPosition,
        y: horizontal
          ? groupPosition + withinGroupPosition
          : yZeroPosition + Math.min(0, barLength),
        width: horizontal ? Math.abs(barLength) : barThickness,
        height: horizontal ? barThickness : Math.abs(barLength),
        fill: colorScale(key),
      };
    }),
  );

  return (
    <g className="visx-bar-group">
      <BarsComponent bars={bars} horizontal={horizontal} xScale={xScale} yScale={yScale} />
    </g>
  );
}