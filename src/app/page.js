"use client";
import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { ComponentRenderer } from "../components/ComponentRenderer";
import { DroppableArea } from "../components/DroppableArea";
import { useState } from "react";
import { ComponentProperties } from "../components/ComponentProperties";
import { useSearchParams } from "next/navigation";

export default function Home() {
  // Hook para acessar os parâmetros da URL
  const searchParams = useSearchParams();
  const componentId = searchParams.get("userId");
  // Componentes disponíveis na barra lateral
  const availableComponents = [
    { id: "button", content: "Botão", type: "button"},
    { id: "text", content: "Texto", type: "text" },
    { id: "input", content: "Campo de Entrada", type: "input" },
  ];

  // Componentes colocados no canvas
  const [canvasComponents, setCanvasComponents] = useState([]);

  const [selectedComponent, setSelectedComponent] = useState(null);

  // ID counter para componentes adicionados ao canvas
  const [idCounter, setIdCounter] = useState(1);

  // Estado para armazenar o valor do background do canvas
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  // Cores de fundo para o canvas
  const colors = ['white', '#f0f0f0', '#e6ffe6', '#fff0f0', '#f0f0ff'];

  function handleComponentSelect(component){
    setSelectedComponent(component);
  }

  // Configurar sensores para melhor controle do arrasto
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Distância mínima para iniciar o arrasto
      },
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    const activeData = active.data.current;
  
    if (over && over.id === "canvas") {
      const sourceComponent = availableComponents.find(c => c.id === active.id);
  
      const canvasElement = document.getElementById("canvas-area");
      const canvasRect = canvasElement.getBoundingClientRect();

      
      
      const draggedNode = active.node;
      const elementWidth = draggedNode?.offsetWidth || 200;
      const elementHeight = draggedNode?.offsetHeight || 40;
  
      if (!activeData.inCanvas) {
        const dropX = event.delta.x + event.activatorEvent.clientX;
        const dropY = event.delta.y + event.activatorEvent.clientY;
  
        let relativeX = dropX - canvasRect.left - elementWidth / 2;
        let relativeY = dropY - canvasRect.top - elementHeight / 2;
  
        relativeX = Math.max(0, Math.min(relativeX, canvasRect.width - elementWidth));
        relativeY = Math.max(0, Math.min(relativeY, canvasRect.height - elementHeight));
  
        if (sourceComponent) {
          const newComponent = {
            id: `${sourceComponent.type}-${idCounter}`,
            content: sourceComponent.content,
            type: sourceComponent.type,
            position: {
              x: relativeX,
              y: relativeY,
            },
            width: elementWidth,
            height: elementHeight,
          };
  
          setCanvasComponents(prev => [...prev, newComponent]);
          setIdCounter(prev => prev + 1);
        }
      } else {
        setCanvasComponents(prev =>
          prev.map(component => {
            if (component.id === active.id) {
              const newX = component.position.x + event.delta.x;
              const newY = component.position.y + event.delta.y;
              
              return {
                ...component,
                position: {
                  x: Math.max(0, Math.min(newX, canvasRect.width - elementWidth)),
                  y: Math.max(0, Math.min(newY, canvasRect.height - elementHeight)),
                },
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
    switch (component.type) {
      case 'button':
        return (
          <button className="h-full w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {component.content}
          </button>
        );
      case 'text':
        return (
          <p className="text-gray-800 w-full h-full">
            {component.content}
          </p>
        );
      case 'input':
        return (
          <input
            type="text"
            placeholder={component.content}
            className=" w-full min-h-full text-neutral-900 border border-gray-300 rounded px-3 py-2"
          />
        );
      default:
        return <div>{component.content}</div>;
    }
  }

  function changeCanvasColor(color) {
    const currentIndex = colors.indexOf(canvasColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setCanvasColor(colors[nextIndex]);
  }
  const handleContentUpdate = (componentId, newContent) => {
    setCanvasComponents(prevComponents =>
      prevComponents.map(component => {
        if (component.id === componentId) {
          return {
            ...component,
            content: newContent,
          };
        }
        return component;
      })
    );
  }

  const handleUpdateSize = (componentId, newSize) => {
    console.log('New size:', newSize);
    setCanvasComponents(prevComponents =>
      prevComponents.map(component => {
        if (component.id === componentId) {
          return {
            ...component,
            width: newSize.width,
            height: newSize.height,
          };
        }
        return component;
      })
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold mb-6">Editor No-Code</h1>
        <div className="mb-4">{componentId}</div>

        <div className="flex gap-6 h-[calc(100vh-150px)]">
          {/* Barra lateral com componentes disponíveis */}
          <div className="w-64 flex flex-col justify-between bg-gray-100 p-4 rounded-lg">
            <div>
              <h2 className="text-lg font-semibold mb-4">Componentes</h2>
              {availableComponents.map(component => (
                <ComponentRenderer
                  key={component.id}
                  id={component.id}
                  inCanvas={false}
                  
                >
                  
                    {renderComponent(component)}
                  
                </ComponentRenderer>
              ))}
            </div>

            {/* New button for changing canvas color */}
            <button
              onClick={changeCanvasColor}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Mudar Cor do Canvas
            </button>
          </div>

          {/* Área central (canvas) */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4">Canvas</h2>
            <DroppableArea id="canvas">
              <div id="canvas-area" style={{ backgroundColor: canvasColor }} className="relative w-full h-full rounded-lg transition-colors">
                {canvasComponents.map(component => (
                  <ComponentRenderer
                    key={component.id}
                    id={component.id}
                    position={component.position}
                    inCanvas={true}
                    onClick={() => handleComponentSelect(component)}
                    size={{width: component.width || 200, height : component.height || 40}}
                    content={component.content}
                  >
                    {renderComponent(component)}
                  </ComponentRenderer>
                ))}
              </div>
            </DroppableArea>
          </div>
          <ComponentProperties 
          component={selectedComponent}
          onUpdateSize={handleUpdateSize}
          onUpdateContent={handleContentUpdate}
          
          />
        </div>
      </div>
    </DndContext>
  );
}