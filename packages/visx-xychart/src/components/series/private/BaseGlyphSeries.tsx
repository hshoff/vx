import React, { useContext, useCallback, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import DataContext from '../../../context/DataContext';
import {
  GlyphProps,
  GlyphsProps,
  EventHandlerParams,
  SeriesProps,
  TooltipContextType,
} from '../../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import isValidNumber from '../../../typeguards/isValidNumber';
import usePointerEventEmitters from '../../../hooks/usePointerEventEmitters';
import { GLYPHSERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import usePointerEventHandlers from '../../../hooks/usePointerEventHandlers';
import TooltipContext from '../../../context/TooltipContext';
import { isPointerEvent } from '../../../typeguards/events';

export type BaseGlyphSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** The size of a `Glyph`, a `number` or a function which takes a `Datum` and returns a `number`. */
  size?: number | ((d: Datum) => number);
  /** Function which handles rendering glyphs. */
  renderGlyphs: (glyphsProps: GlyphsProps<XScale, YScale, Datum>) => React.ReactNode;
};

function BaseGlyphSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  data,
  dataKey,
  onBlur: onBlurProps,
  onFocus: onFocusProps,
  onPointerMove: onPointerMoveProps,
  onPointerOut: onPointerOutProps,
  onPointerUp: onPointerUpProps,
  enableEvents = true,
  renderGlyphs,
  size = 8,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
}: BaseGlyphSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme, horizontal } = useContext(DataContext);
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  // @TODO allow override
  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

  const { showTooltip, hideTooltip } = (useContext(TooltipContext) ?? {}) as TooltipContextType<
    Datum
  >;
  const onPointerMoveOrFocus = useCallback(
    (p: EventHandlerParams<Datum>) => {
      showTooltip(p);
      if (onPointerMoveProps) onPointerMoveProps(p);
      if (onFocusProps) onFocusProps(p);
    },
    [showTooltip, onPointerMoveProps, onFocusProps],
  );
  const onPointerOutOrBlur = useCallback(
    (event: React.PointerEvent | React.FocusEvent) => {
      hideTooltip();
      if (event) {
        if (onPointerOutProps && isPointerEvent(event)) onPointerOutProps(event);
        else if (onBlurProps && !isPointerEvent(event)) onBlurProps(event);
      }
    },
    [hideTooltip, onPointerOutProps, onBlurProps],
  );
  const ownEventSourceKey = `${GLYPHSERIES_EVENT_SOURCE}-${dataKey}`;
  const pointerEventEmitters = usePointerEventEmitters({
    source: ownEventSourceKey,
    onBlur: !!onBlurProps && enableEvents,
    onFocus: !!onFocusProps && enableEvents,
    onPointerMove: !!onPointerMoveProps && enableEvents,
    onPointerOut: !!onPointerOutProps && enableEvents,
    onPointerUp: !!onPointerUpProps && enableEvents,
  });
  usePointerEventHandlers({
    dataKey,
    onBlur: enableEvents ? onPointerOutOrBlur : undefined,
    onFocus: enableEvents ? onPointerMoveOrFocus : undefined,
    onPointerMove: enableEvents ? onPointerMoveOrFocus : undefined,
    onPointerOut: enableEvents ? onPointerOutOrBlur : undefined,
    onPointerUp: enableEvents ? onPointerUpProps : undefined,
    sources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

  const glyphs = useMemo(
    () =>
      data
        .map((datum, i) => {
          const x = getScaledX(datum);
          if (!isValidNumber(x)) return null;
          const y = getScaledY(datum);
          if (!isValidNumber(y)) return null;
          return {
            key: `${i}`,
            x,
            y,
            color,
            size: typeof size === 'function' ? size(datum) : size,
            datum,
          };
        })
        .filter(point => point) as GlyphProps<Datum>[],
    [getScaledX, getScaledY, data, size, color],
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{renderGlyphs({ glyphs, xScale, yScale, horizontal, ...pointerEventEmitters })}</>
  );
}

export default withRegisteredData(BaseGlyphSeries);
