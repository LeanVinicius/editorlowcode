"use client";

// Este componente define uma área droppable no layout usando o hook `useDroppable` do `@dnd-kit/core`.
// Ele permite que outros componentes sejam soltos dentro dele e fornece feedback visual quando um item está sendo arrastado sobre ele.
import { useDroppable } from "@dnd-kit/core";

export function DroppableArea({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  
  // const style = {
  //   backgroundColor: isOver ? 'rgba(0, 0, 0, 0.05)' : undefined,
  //   minHeight: '200px',
  //   borderRadius: '8px',
  //   width: '100%',
  //   height: '100%'
  // };
  
  return (
    <div ref={setNodeRef}  className="">
      {children}
    </div>
  );
}