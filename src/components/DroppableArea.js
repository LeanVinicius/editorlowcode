"use client";
import { useDroppable } from "@dnd-kit/core";

export function DroppableArea({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  
  const style = {
    backgroundColor: isOver ? 'rgba(0, 0, 0, 0.05)' : undefined,
    padding: '20px',
    minHeight: '200px',
    border: '2px dashed #ccc',
    borderRadius: '8px',
    width: '100%',
    height: '100%'
  };
  
  return (
    <div ref={setNodeRef} style={style} className="p-4">
      {children}
    </div>
  );
}