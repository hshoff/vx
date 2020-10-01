import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export type ParentSizeProps = {
  /** Optional `className` to add to the parent `div` wrapper used for size measurement. */
  className?: string;
  /** Child render updates upon resize are delayed until `debounceTime` milliseconds _after_ the last resize event is observed. */
  debounceTime?: number;
  /** Optional flag to toggle leading debounce calls. When set to true this will ensure that the component always renders immediately. (defaults to true) */
  enableDebounceLeadingCall?: boolean;
  /** Optional `style` object to apply to the parent `div` wrapper used for size measurement. */
  parentSizeStyles?: React.CSSProperties;
  /** Child render function `({ width, height, top, left, ref, resize }) => ReactNode`. */
  children: (
    args: {
      ref: HTMLDivElement | null;
      resize: (state: ParentSizeState) => void;
    } & ParentSizeState,
  ) => React.ReactNode;
};

type ParentSizeState = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type ParentSizeProvidedProps = ParentSizeState;

export default function ParentSize({
  className,
  children,
  debounceTime = 300,
  parentSizeStyles = { width: '100%', height: '100%' },
  enableDebounceLeadingCall = true,
  ...restProps
}: ParentSizeProps & Omit<JSX.IntrinsicElements['div'], keyof ParentSizeProps>) {
  const target = useRef<HTMLDivElement | null>(null);
  const animationFrameID = useRef(0);

  const [state, setState] = useState<ParentSizeState>({ width: 0, height: 0, top: 0, left: 0 });

  const resize = useMemo(
    () =>
      debounce(
        ({ width, height, top, left }: ParentSizeState) => {
          setState(() => ({ width, height, top, left }));
        },
        debounceTime,
        { leading: enableDebounceLeadingCall },
      ),
    [debounceTime, enableDebounceLeadingCall],
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries = [] /** , observer */) => {
      entries.forEach(entry => {
        const { left, top, width, height } = entry.contentRect;
        animationFrameID.current = window.requestAnimationFrame(() => {
          resize({ width, height, top, left });
        });
      });
    });
    if (target.current) observer.observe(target.current);

    return () => {
      window.cancelAnimationFrame(animationFrameID.current);
      observer.disconnect();
      resize.cancel();
    };
  }, [resize]);

  return (
    <div style={parentSizeStyles} ref={target} className={className} {...restProps}>
      {children({
        ...state,
        ref: target.current,
        resize,
      })}
    </div>
  );
}
