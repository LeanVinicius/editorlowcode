"use client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export function ComponentRenderer({ id, children, position = {x: 0, y: 0},inCanvas = false, onClick }) {
  const [size, setSize] = useState({ width: 200, height: 40 });
  const [isResizing, setIsResizing] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
        type: id.split('-')[0],
        inCanvas
    },
    disabled : isResizing,
  });
  

  const style = {
    transform: inCanvas && !isResizing ? CSS.Translate.toString(transform) : undefined,
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
    setIsResizing(true);
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const OnMouseMove = (moveEvent) => {
      moveEvent.preventDefault();
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      setSize({
        width: Math.max(50,startWidth + deltaX),
        height: Math.max(30,startHeight + deltaY)
      });
      
      
    }
    const OnMouseUp = () => {
      setIsResizing(false);
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
      onClick={onClick}
      {...(isResizing ? {} : { ...listeners})}
      {...(isResizing ? {} : { ...attributes})}
    >
      {children}
      {inCanvas && (
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize" onMouseDown={handleResize}></div>
      )}
    </div>
  );
}
