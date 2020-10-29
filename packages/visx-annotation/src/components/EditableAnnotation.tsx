/* eslint-disable react/jsx-handler-names */
import React, { useCallback, useRef } from 'react';
import useDrag, { UseDrag, HandlerArgs as DragHandlerArgs } from '@visx/drag/lib/useDrag';
import { AnnotationContextType } from '../types';
import Annotation from './Annotation';

export type EditableAnnotationProps = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
  /** Width of the possible drag canvas (e.g., SVG container). */
  width: number;
  /** Height of the possible drag canvas (e.g., SVG container). */
  height: number;
  /** Annotation children (Subject, Label, Connector) */
  children: React.ReactNode;
  /** Optional circle props to set on the subject drag handle. */
  subjectDragHandleProps?: React.SVGProps<SVGCircleElement>;
  /** Optional circle props to set on the label drag handle. */
  labelDragHandleProps?: React.SVGProps<SVGCircleElement>;
  /** Callback invoked on drag start. */
  onDragStart?: ({ x, y, dx, dy, event }: HandlerArgs) => void;
  /** Callback invoked on drag move. */
  onDragMove?: ({ x, y, dx, dy, event }: HandlerArgs) => void;
  /** Callback invoked on drag end. */
  onDragEnd?: ({ x, y, dx, dy, event }: HandlerArgs) => void;
};

export type HandlerArgs = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
  event: React.MouseEvent | React.TouchEvent;
};

const defaultDragHandleProps = {
  r: 10,
  fill: 'transparent',
  stroke: '#777',
  strokeDasharray: '4,2',
  strokeWidth: 2,
};

function callbackFactory({
  x,
  y,
  dx,
  dy,
  labelDrag,
  subjectDrag,
  callback,
}: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  labelDrag?: UseDrag;
  subjectDrag?: UseDrag;
  callback?: (args: HandlerArgs) => void;
}) {
  return ({ event }: DragHandlerArgs) => {
    if (callback) {
      callback({
        event,
        x: x + (subjectDrag?.dx ?? 0),
        y: y + (subjectDrag?.dy ?? 0),
        dx: dx + (labelDrag?.dx ?? 0),
        dy: labelDrag?.dy ?? 0,
      });
    }
  };
}

export default function EditableAnnotation({
  x: subjectX = 0,
  y: subjectY = 0,
  dx: labelDx = 0,
  dy: labelDy = 0,
  children,
  width,
  height,
  subjectDragHandleProps,
  labelDragHandleProps,
  onDragStart,
  onDragMove,
  onDragEnd,
}: EditableAnnotationProps) {
  // chicken before the egg, we need these to reference drag state
  // in callbacks, defined before useDrag
  const subjectDragRef = useRef<UseDrag>();
  const labelDragRef = useRef<UseDrag>();

  const handleDragStart = useCallback(
    callbackFactory({
      callback: onDragStart,
      x: subjectX,
      y: subjectY,
      dx: labelDx,
      dy: labelDy,
      subjectDrag: subjectDragRef.current,
      labelDrag: labelDragRef.current,
    }),
    [labelDx, labelDy, onDragStart, subjectX, subjectY],
  );

  const handleDragMove = useCallback(
    callbackFactory({
      callback: onDragMove,
      x: subjectX,
      y: subjectY,
      dx: labelDx,
      dy: labelDy,
      subjectDrag: subjectDragRef.current,
      labelDrag: labelDragRef.current,
    }),
    [labelDx, labelDy, onDragStart, subjectX, subjectY],
  );

  const handleDragEnd = useCallback(
    callbackFactory({
      callback: onDragMove,
      x: subjectX,
      y: subjectY,
      dx: labelDx,
      dy: labelDy,
      subjectDrag: subjectDragRef.current,
      labelDrag: labelDragRef.current,
    }),
    [labelDx, labelDy, onDragStart, subjectX, subjectY],
  );

  const subjectDrag = useDrag({
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
  });

  const labelDrag = useDrag({
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd,
  });

  // enable referencing these in the callbacks defined before useDrag is called
  subjectDragRef.current = subjectDrag;
  labelDragRef.current = labelDrag;

  return (
    <>
      {subjectDrag.isDragging && (
        <rect
          width={width}
          height={height}
          onMouseMove={subjectDrag.dragMove}
          onMouseUp={subjectDrag.dragEnd}
          fill="transparent"
        />
      )}
      <circle
        cx={subjectX}
        cy={subjectY}
        transform={`translate(${subjectDrag.dx},${subjectDrag.dy})`}
        onMouseMove={subjectDrag.dragMove}
        onMouseUp={subjectDrag.dragEnd}
        onMouseDown={subjectDrag.dragStart}
        onTouchStart={subjectDrag.dragStart}
        onTouchMove={subjectDrag.dragMove}
        onTouchEnd={subjectDrag.dragEnd}
        {...defaultDragHandleProps}
        {...subjectDragHandleProps}
      />
      {labelDrag.isDragging && (
        <rect
          width={width}
          height={height}
          onMouseMove={labelDrag.dragMove}
          onMouseUp={labelDrag.dragEnd}
          fill="transparent"
        />
      )}
      <circle
        cx={subjectX + subjectDrag.dx + labelDx}
        cy={subjectY + subjectDrag.dy + labelDy}
        transform={`translate(${labelDrag.dx},${labelDrag.dy})`}
        onMouseMove={labelDrag.dragMove}
        onMouseUp={labelDrag.dragEnd}
        onMouseDown={labelDrag.dragStart}
        onTouchStart={labelDrag.dragStart}
        onTouchMove={labelDrag.dragMove}
        onTouchEnd={labelDrag.dragEnd}
        {...defaultDragHandleProps}
        {...labelDragHandleProps}
      />
      <Annotation
        x={subjectX + subjectDrag.dx}
        y={subjectY + subjectDrag.dy}
        dx={labelDx + labelDrag.dx}
        dy={labelDy + labelDrag.dy}
      >
        {children}
      </Annotation>
    </>
  );
}
