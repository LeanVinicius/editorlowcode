"use client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export function ComponentRenderer({ id, children, position = { x: 0, y: 0 }, inCanvas = false, onClick, size, colorComponent }) {
  const [localSize, setLocalSize] = useState(size);
  
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      type: id.split('-')[0],
      inCanvas
    },
  });


  const style = {
    transform: inCanvas ? CSS.Translate.toString(transform) : undefined,
    position: inCanvas ? 'absolute' : 'relative',
    left: inCanvas ? `${position.x}px` : undefined,
    top: inCanvas ? `${position.y}px` : undefined,
    width: size?.width ? `${size.width}px` : `${localSize.width}px`,
    height: size?.height ? `${size.height}px` : `${localSize.height}px`,
    display: 'flex',
    cursor: 'move',
    zIndex: inCanvas ? 1 : 100,
    backgroundColor: colorComponent || undefined,
  };

  switch (id.split('-')[0]) {
    case 'button':
      style.borderRadius = '32px';
      break;
    case 'success':
      style.backgroundColor = 'green';
      style.borderRadius = '32px';
      break;
    case 'neutral':
      style.backgroundColor = 'gray';
      style.borderRadius = '0px';
      break;
    default:
      style.backgroundColor = 'blue';
      style.borderRadius = '8px';
  }
  // const handleResize = (event) => {
  //   event.stopPropagation();
  //   setIsResizing(true);
  //   const startX = event.clientX;
  //   const startY = event.clientY;
  //   const startWidth = size.width;
  //   const startHeight = size.height;

  //   const OnMouseMove = (moveEvent) => {
  //     moveEvent.preventDefault();
  //     const deltaX = moveEvent.clientX - startX;
  //     const deltaY = moveEvent.clientY - startY;

  //     setLocalSize({
  //       width: Math.max(50, startWidth + deltaX),
  //       height: Math.max(30, startHeight + deltaY)
  //     });


  //   }
  //   const OnMouseUp = () => {
  //     setIsResizing(false);
  //     document.removeEventListener('mousemove', OnMouseMove);
  //     document.removeEventListener('mouseup', OnMouseUp);
  //   }
  //   document.addEventListener('mousemove', OnMouseMove);
  //   document.addEventListener('mouseup', OnMouseUp);
  // } 

  return (
    <div
      suppressHydrationWarning
      ref={setNodeRef}
      style={style}
      className="flex flex-col"
      onClick={onClick}
      { ...listeners }
      { ...attributes }
    >
      {children}

    </div>
  );
}
