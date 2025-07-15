"use client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

/**
 * @param {object} props - As propriedades do componente.
 * @param {string} props.id - O ID único do componente, usado para drag and drop.
 * @param {React.ReactNode} props.children - O conteúdo real do componente a ser renderizado.
 * @param {object} [props.position={x: 0, y: 0}] - A posição do componente no canvas.
 * @param {boolean} [props.inCanvas=false] - Indica se o componente está dentro da área do canvas (afeta posicionamento e drag).
 * @param {() => void} [props.onClick] - Função a ser chamada quando o componente é clicado.
 * @param {object} [props.size] - O tamanho (width, height) do componente.
 * @param {string} [props.colorComponent] - A cor a ser aplicada ao componente (pode variar dependendo do tipo).
 * @returns {JSX.Element} Renderiza um componente individual com funcionalidade de arrastar.
 */
export function MoveableDesignComponent({ id, children, position = { x: 0, y: 0 }, inCanvas = false, onClick, size, colorComponent,isSelected = false, }) {
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
    
    display: 'flex',
    cursor: 'move',
    zIndex: inCanvas ? 1 : 100,
    //backgroundColor: colorComponent || undefined,
  };


  switch (id.split('-')[0]) {
    case 'button':
      style.borderRadius = '32px';
      style.backgroundColor = colorComponent || undefined;
      style.width = size?.width ? `${size.width}px` : `${localSize.width}px`;
      style.height = size?.height ? `${size.height}px` : `${localSize.height}px`;
      break;
    case 'text':
     style.color = colorComponent || undefined;
     style.backgroundColor = undefined;
     break;
    case 'neutral':
      style.backgroundColor = 'gray';
      style.borderRadius = '0px';
      break;
    case 'table':
      style.backgroundColor = '#ffffff80';
      style.color = colorComponent || undefined;
      style.borderRadius = '8px';
      style.width = size?.width ? `${size.width}px` : `${localSize.width}px`;
      break;
    
    
    default:
      style.backgroundColor = '#ffffff80';
      style.color = colorComponent || undefined;
      style.borderRadius = '8px';
      style.width = size?.width ? `${size.width}px` : `${localSize.width}px`;
      style.height = size?.height ? `${size.height}px` : `${localSize.height}px`;
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
      className={`flex flex-col m-2 ${
      isSelected ? 'border-2 border-[rgba(253,101,43,0.75)] shadow-md shadow-orange-300':``}`}
      onClick={onClick}
      { ...listeners }
      { ...attributes }
    >
      {children}

    </div>
  );
}
