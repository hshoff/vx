import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@vx/responsive/lib/components/ParentSize';
import Example from './Example';

render(
  <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>,
  document.getElementById('root'),
);
