import React from 'react';
import { PositionScale } from '@visx/shape/lib/types';
import BaseBarStack, { BaseBarStackProps } from './BaseBarStack';
import Bars from './Bars';

export default function BarStack<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object
>({ ...props }: Omit<BaseBarStackProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarStack<XScale, YScale, Datum> {...props} BarsComponent={Bars} />;
}
