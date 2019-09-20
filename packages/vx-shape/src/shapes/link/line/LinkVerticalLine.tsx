import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';
import { SharedLinkProps, AccessorProps } from '../types';

export function pathVerticalLine<Link, Node>({
  source,
  target,
  x,
  y,
}: Required<AccessorProps<Link, Node>>) {
  return (data: Link) => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.lineTo(tx, ty);

    return path.toString();
  };
}

export type LinkVerticalLineProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;

export default function LinkVerticalLine<Link, Node>({
  className,
  innerRef,
  data,
  path,
  x = (d: any) => d.x,
  y = (d: any) => d.y,
  source = (d: any) => d.source,
  target = (d: any) => d.target,
  children,
  ...restProps
}: LinkVerticalLineProps<Link, Node>) {
  const pathGen = path || pathVerticalLine({ source, target, x, y });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-vertical-line', className)}
      d={pathGen(data)}
      {...restProps}
    />
  );
}