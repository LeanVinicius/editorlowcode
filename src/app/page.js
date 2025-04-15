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

  // Estado para armazenar o valor do background do canvas
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  // Cores de fundo para o canvas
  const colors = ['white', '#f0f0f0', '#e6ffe6', '#fff0f0', '#f0f0ff'];

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

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold mb-6">Editor No-Code</h1>

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
                  <div className="">
                    {renderComponent(component)}
                  </div>
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
              <div style={{ backgroundColor: canvasColor }} className="w-full h-full rounded-lg transition-colors">
                {canvasComponents.map(component => (
                  <ComponentRenderer
                    key={component.id}
                    id={component.id}
                    position={component.position}
                    inCanvas={true}
                  >
                    {renderComponent(component)}
                  </ComponentRenderer>
                ))}
              </div>
            </DroppableArea>
          </div>
        </div>
      </div>
    </DndContext>
  );
}