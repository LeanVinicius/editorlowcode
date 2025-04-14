"use client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useRef } from "react";

export function ComponentRenderer({ id, children, position = {x: 0, y: 0},inCanvas = false }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
        type: 'component',
        inCanvas
    }
  });
  

  const style = {
    transform: CSS.Translate.toString(transform),
    position: inCanvas ? 'absolute' : 'relative',
    left: inCanvas ? `${position.x}px` : undefined,
    top: inCanvas ? `${position.y}px` : undefined,
    cursor: 'move',
    zIndex: 100,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4"
    >
      {children}
    </div>
  );
}
