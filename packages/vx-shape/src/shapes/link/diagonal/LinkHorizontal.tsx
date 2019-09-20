import React from 'react';
import cx from 'classnames';
import { linkHorizontal } from 'd3-shape';
import { SharedLinkProps, AccessorProps } from '../types';

export function pathHorizontalDiagonal<Link, Node>({
  source,
  target,
  x,
  y,
}: Required<AccessorProps<Link, Node>>) {
  return (data: Link) => {
    const link = linkHorizontal<Link, Node>();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

export type LinkHorizontalDiagonalProps<Link, Node> = AccessorProps<Link, Node> &
  SharedLinkProps<Link>;

export default function LinkHorizontalDiagonal<Link, Node>({
  className,
  children,
  data,
  innerRef,
  path,
  x = (n: any) => n && n.x,
  y = (n: any) => n && n.y,
  source = (l: any) => l && l.source,
  target = (l: any) => l && l.target,
  ...restProps
}: LinkHorizontalDiagonalProps<Link, Node>) {
  const pathGen = path || pathHorizontalDiagonal({ source, target, x, y });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-horizontal-diagonal', className)}
      d={pathGen(data)}
      {...restProps}
    />
  );
}