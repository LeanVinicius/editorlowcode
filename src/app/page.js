"use client";
import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { ComponentRenderer } from "../components/ComponentRenderer";
import { DroppableArea } from "../components/DroppableArea";
import { useState, Suspense } from "react";
import { ComponentProperties } from "../components/ComponentProperties";
import { renderComponent } from "@/utils/renderComponent";
import { ComponentsSidebar } from "@/components/ComponentsSidebar";
import { UserCanvasLoader } from "@/utils/UserCanvasLoader";

export default function Home() {

  // Componentes disponíveis na barra lateral
  const availableComponents = [
    { id: "button", content: "Botão", type: "button", width: 175, height: 41, colorComponent: "#000000" },
    { id: "text", content: "Texto", type: "heading", width: 175, height: 41, colorComponent: "#000000" },
    { id: "input", content: "Campo de Entrada", type: "input",width : 175, height: 64, colorComponent: "#000000" },
    { id: "select", content: "Seleção", type: "select" },
    { id: "checkbox", content: "Checkbox", type: "checkbox" },
    { id: "toggle", content: "ON/OFF", type: "toggle" },
  ];
  // cor preta : 

  // Componentes colocados no canvas
  const [canvasComponents, setCanvasComponents] = useState([]);

  const [selectedComponent, setSelectedComponent] = useState(null);

  // ID counter para componentes adicionados ao canvas
  const [idCounter, setIdCounter] = useState(1);

  // Estado para armazenar o valor do background do canvas
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  // Cores de fundo para o canvas
  const colors = ['white', '#f0f0f0', '#e6ffe6', '#fff0f0', '#f0f0ff'];

  function handleComponentSelect(component) {
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
      const sourceComponent = activeData.inCanvas
  ? canvasComponents.find(c => c.id === active.id)
  : availableComponents.find(c => c.id === active.id);

      const canvasElement = document.getElementById("canvas-area");
      const canvasRect = canvasElement.getBoundingClientRect();


      
      const draggedNode = active.node;
      const elementWidth = draggedNode?.offsetWidth || sourceComponent.width;
      const elementHeight = draggedNode?.offsetHeight || sourceComponent.height;

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
            colorComponent: sourceComponent.colorComponent,
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
  const handleUpdateColor = (componentId, newColor) => {
    setCanvasComponents(prevComponents =>
      prevComponents.map(component => {
        if (component.id === componentId) {
          return {
            ...component,
            colorComponent: newColor,
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
        {/* Suspense para carregar os componentes com base no userId da URL */}
        {/*<Suspense fallback={<div className="mb-4">Carregando componentes do usuário...</div>}>
          <UserCanvasLoader onDataLoaded={setCanvasComponents} />
        </Suspense>*/}

        <div className="flex gap-6 h-[calc(100vh-150px)]">
          {/* Barra lateral com componentes disponíveis */}
          <ComponentsSidebar
            availableComponents={availableComponents}
            onCanvasColorChange={changeCanvasColor}
          />
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
                    size={{ width: component.width, height: component.height}}
                    content={component.content}
                    colorComponent={component.colorComponent}

                  >
                    {renderComponent(component.type, component.content, component.colorComponent)}
                  </ComponentRenderer>
                ))}
              </div>
            </DroppableArea>
          </div>
          <ComponentProperties
            component={selectedComponent}
            onUpdateSize={handleUpdateSize}
            onUpdateContent={handleContentUpdate}
            onUpdateColor={handleUpdateColor}
          />
          <div className="mt-6 text-black bg-gray-100 p-4 rounded-md max-h-64 overflow-auto">
            <h3 className="font-semibold mb-2">Debug: Canvas Components</h3>
            <pre className="text-xs whitespace-pre-wrap break-all">
              {JSON.stringify(canvasComponents, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </DndContext>

  );
}