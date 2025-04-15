"use client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export function ComponentRenderer({ id, children, position = {x: 0, y: 0},inCanvas = false }) {
  const [size, setSize] = useState({ width: 200, height: 40 });
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
        type: id.split('-')[0],
        inCanvas
    }
  });
  

  const style = {
    transform: CSS.Translate.toString(transform),
    position: inCanvas ? 'absolute' : 'relative',
    left: inCanvas ? `${position.x}px` : undefined,
    top: inCanvas ? `${position.y}px` : undefined,
    width: `${size.width}px`,
    height: `${size.height}px`,
    display: 'flex',
    cursor: 'move',
    zIndex: inCanvas ? 1: 100,
  };

  const handleResize = (event) => {
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const OnMouseMove = (moveEvent) => {
      moveEvent.preventDefault();
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      setSize({
        width: startWidth + deltaX,
        height: Math.max(30,startHeight + deltaY)
      });
      
      
    }
    const OnMouseUp = () => {
      document.removeEventListener('mousemove', OnMouseMove);
      document.removeEventListener('mouseup', OnMouseUp);
    }
    document.addEventListener('mousemove', OnMouseMove);
    document.addEventListener('mouseup', OnMouseUp);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col"
      {...attributes}
      {...listeners}
    >
      {children}
      {inCanvas && (
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize" onMouseDown={handleResize}></div>
      )}
    </div>
  );
}
