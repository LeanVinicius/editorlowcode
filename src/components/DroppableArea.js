"use client";
import { useDroppable } from "@dnd-kit/core";

export function DroppableArea({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  
  const style = {
    backgroundColor: isOver ? 'rgba(0, 0, 0, 0.05)' : undefined,
    minHeight: '200px',
    borderRadius: '8px',
    width: '100%',
    height: '100%'
  };
  
  return (
    <div ref={setNodeRef} style={style} className="">
      {children}
    </div>
  );
}