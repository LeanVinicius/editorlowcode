"use client";
import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { ComponentRenderer } from "../components/ComponentRenderer";
import { DroppableArea } from "../components/DroppableArea";
import { useState } from "react";

export default function Home() {
  // Componentes disponíveis na barra lateral
  const availableComponents = [
    { id: "button", content: "Botão", type: "button" },
    { id: "text", content: "Texto", type: "text" },
    { id: "input", content: "Campo de Entrada", type: "input" },
  ];

  // Componentes colocados no canvas
  const [canvasComponents, setCanvasComponents] = useState([]);
  
  // ID counter para componentes adicionados ao canvas
  const [idCounter, setIdCounter] = useState(1);

  // Configurar sensores para melhor controle do arrasto
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Distância mínima para iniciar o arrasto
      },
    })
  );

  function handleDragEnd(event) {
    const { active, over, delta } = event;
    const activeData = active.data.current;
    
    // Se o componente foi solto na área do canvas
    if (over && over.id === "canvas") {
      if (!activeData.inCanvas) {
        // Adicionar novo componente ao canvas
        const componentType = activeData.type;
        const sourceComponent = availableComponents.find(c => c.id === active.id);
        
        if (sourceComponent) {
          const newComponent = {
            id: `${sourceComponent.type}-${idCounter}`,
            content: sourceComponent.content,
            type: sourceComponent.type,
            position: { 
              x: delta.x, 
              y: delta.y 
            }
          };
          
          setCanvasComponents(prev => [...prev, newComponent]);
          setIdCounter(prev => prev + 1);
        }
      } else {
        // Atualizar posição de um componente existente no canvas
        setCanvasComponents(prev => 
          prev.map(component => {
            if (component.id === active.id) {
              return {
                ...component,
                position: {
                  x: component.position.x + delta.x,
                  y: component.position.y + delta.y
                }
              };
            }
            return component;
          })
        );
      }
    }
  }

  // Renderizar o componente apropriado com base no tipo
  function renderComponent(component) {
    switch(component.type) {
      case 'button':
        return (
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {component.content}
          </button>
        );
      case 'text':
        return (
          <p className="text-gray-800">
            {component.content}
          </p>
        );
      case 'input':
        return (
          <input 
            type="text" 
            placeholder={component.content}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        );
      default:
        return <div>{component.content}</div>;
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold mb-6">Editor No-Code</h1>
        
        <div className="flex gap-6 h-[calc(100vh-150px)]">
          {/* Barra lateral com componentes disponíveis */}
          <div className="w-64 bg-gray-100 p-4 rounded-lg overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Componentes</h2>
            
            {availableComponents.map(component => (
              <ComponentRenderer 
                key={component.id} 
                id={component.id}
                inCanvas={false}
              >
                <div className="p-3 border border-gray-300 bg-white rounded-md w-full">
                  {renderComponent(component)}
                </div>
              </ComponentRenderer>
            ))}
          </div>
          
          {/* Área central (canvas) */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Canvas</h2>
            <DroppableArea id="canvas">
              {canvasComponents.map(component => (
                <ComponentRenderer 
                  key={component.id} 
                  id={component.id}
                  position={component.position}
                  inCanvas={true}
                >
                  <div className="p-3 border border-gray-300 bg-white rounded-md">
                    {renderComponent(component)}
                  </div>
                </ComponentRenderer>
              ))}
            </DroppableArea>
          </div>
        </div>
      </div>
    </DndContext>
  );
}