import React from 'react';
import { shallow, mount } from 'enzyme';

import { BarRounded } from '../src';
import { useBarRoundedPath } from '../src/shapes/BarRounded';

const testProps = { x: 0, y: 0, width: 10, height: 20, radius: 2 };
const BarRoundedWrapper = (restProps = {}) => shallow(<BarRounded {...testProps} {...restProps} />);

describe('<BarRounded />', () => {
  it('should be defined', () => {
    expect(BarRounded).toBeDefined();
  });

  it('should have the .visx-bar-rounded class', () => {
    expect(
      BarRoundedWrapper({
        className: 'test',
      }).prop('className'),
    ).toBe('visx-bar-rounded test');
  });

  it('should support children render function', () => {
    const children = jest.fn(() => <rect id="test" />);
    const wrapper = BarRoundedWrapper({ children });
    expect(children).toHaveBeenCalledTimes(1);
    expect(wrapper.find('rect#test')).toHaveLength(1);
  });

  it('should support hooks with useBarRoundedPath', () => {
    const path = useBarRoundedPath({ ...testProps, all: true });
    expect(path).toBe(
      'M2,0 h6 a2,2 0 0 1 2,2 v16 a2,2 0 0 1 -2,2 h-6 a2,2 0 0 1 -2,-2 v-16 a2,2 0 0 1 2,-2z',
    );
  });

  it('should expose its ref via an innerRef prop', () => {
    // eslint-disable-next-line jest/no-test-return-statement
    return new Promise(done => {
      const refCallback = (ref: SVGPathElement) => {
        expect(ref.tagName).toMatch('path');
        done();
      };
      mount(
        <svg>
          <BarRounded innerRef={refCallback} {...testProps} />
        </svg>,
      );
    });
  });

  it('should set top left corner radius', () => {
    const wrapper = BarRoundedWrapper({ topLeft: true });
    expect(wrapper.prop('d')).toBe('M2,0 h6 h2v2 v16 v2h-2 h-6 h-2v-2 v-16 a2,2 0 0 1 2,-2z');
  });

  it('should set top right corner radius', () => {
    const wrapper = BarRoundedWrapper({ topRight: true });
    expect(wrapper.prop('d')).toBe('M2,0 h6 a2,2 0 0 1 2,2 v16 v2h-2 h-6 h-2v-2 v-16 v-2h2z');
  });

  it('should set bottom left corner radius', () => {
    const wrapper = BarRoundedWrapper({ bottomLeft: true });
    expect(wrapper.prop('d')).toBe('M2,0 h6 h2v2 v16 v2h-2 h-6 a2,2 0 0 1 -2,-2 v-16 v-2h2z');
  });

  it('should set bottom right corner radius', () => {
    const wrapper = BarRoundedWrapper({ bottomRight: true });
    expect(wrapper.prop('d')).toBe('M2,0 h6 h2v2 v16 a2,2 0 0 1 -2,2 h-6 h-2v-2 v-16 v-2h2z');
  });

  it('should set top left & top right corner radius', () => {
    const wrapper = BarRoundedWrapper({ top: true });
    expect(wrapper.prop('d')).toBe(
      'M2,0 h6 a2,2 0 0 1 2,2 v16 v2h-2 h-6 h-2v-2 v-16 a2,2 0 0 1 2,-2z',
    );
  });

  it('should set bottom left & bottom right corner radius', () => {
    const wrapper = BarRoundedWrapper({ bottom: true });
    expect(wrapper.prop('d')).toBe(
      'M2,0 h6 h2v2 v16 a2,2 0 0 1 -2,2 h-6 a2,2 0 0 1 -2,-2 v-16 v-2h2z',
    );
  });

  it('should set top left & bottom left corner radius', () => {
    const wrapper = BarRoundedWrapper({ left: true });
    expect(wrapper.prop('d')).toBe(
      'M2,0 h6 h2v2 v16 v2h-2 h-6 a2,2 0 0 1 -2,-2 v-16 a2,2 0 0 1 2,-2z',
    );
  });

  it('should set top right & bottom right corner radius', () => {
    const wrapper = BarRoundedWrapper({ right: true });
    expect(wrapper.prop('d')).toBe(
      'M2,0 h6 a2,2 0 0 1 2,2 v16 a2,2 0 0 1 -2,2 h-6 h-2v-2 v-16 v-2h2z',
    );
  });

  it('should set all corner radius', () => {
    const wrapper = BarRoundedWrapper({ all: true });
    expect(wrapper.prop('d')).toBe(
      'M2,0 h6 a2,2 0 0 1 2,2 v16 a2,2 0 0 1 -2,2 h-6 a2,2 0 0 1 -2,-2 v-16 a2,2 0 0 1 2,-2z',
    );
  });

  it('should clamp radius to the center of the shortest side of the rect', () => {
    const wrapper = BarRoundedWrapper({ topLeft: true, width: 4, radius: 400 });
    const r = Math.min(4, testProps.height) / 2;
    expect(wrapper.prop('d')).toBe(
      `M2,0 h0 h2v2 v16 v2h-2 h0 h-2v-2 v-16 a${r},${r} 0 0 1 ${r},-${r}z`,
    );
  });
});
