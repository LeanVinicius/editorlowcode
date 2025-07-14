"use client";

// Este é o componente principal da interface de design.
// É responsável por:
// - Gerenciar o estado dos componentes no canvas e das telas.
// - Lidar com as interações de drag and drop para adicionar e mover componentes.
// - Interagir com a API para salvar e carregar o estado do canvas e das telas.
// - Coordenar a renderização dos sub-componentes que formam a interface (sidebar, área do canvas, painel de propriedades, abas de tela).


import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import { MoveableDesignComponent } from './MoveableDesignComponent';
import { DroppableArea } from "../components/DroppableArea";
import { useState, useEffect, } from "react";
import { ComponentProperties } from "../components/ComponentProperties";
import { renderComponent } from "@/utils/renderComponent";
import { ComponentsSidebar } from "@/components/ComponentsSidebar";
import { UserCanvasLoader } from "@/utils/UserCanvasLoader";
import { useSearchParams } from "next/navigation";

import { CanvasApi } from "@/services/CanvasApi";
import { dragHelpers } from "@/utils/DragAndDropHelpers";
import { useCanvasState } from "../hooks/useCanvasState";
import { useScreenManager } from "../hooks/useScreenManager";

import {
  DEFAULT_COMPONENTS,
  CANVAS_DIMENSIONS,
  DRAG_ACTIVATION_DISTANCE,
} from "@/constants/Components";

export default function CanvasDesigner() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const projectId = searchParams.get("projectId");

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  // Custom hooks para gerenciar estado
  const {
    canvasComponents,
    selectedComponent,
    componentIdCounter,
    setCanvasComponents,
    updateComponentContent,
    updateComponentName,
    updateComponentSize,
    updateComponentColor,
    updateComponentMandatory,
    updateComponentPosition,
    updateComponentRole,
    updateComponentRules,
    addComponent,
    removeComponent,
    clearCanvas,
    selectComponent,
  } = useCanvasState();

  const {
    availableScreens,
    currentScreenId,
    currentScreenName,
    isEditingScreenName,
    temporaryScreenName,
    setAvailableScreens,
    setCurrentScreenId,
    setIsEditingScreenName,
    setTemporaryScreenName,
    createNewScreen,
    updateScreenName,
    selectScreen,
    deleteScreen,
  } = useScreenManager(userId, projectId);

  // Drag and drop sensors
  const dragSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: DRAG_ACTIVATION_DISTANCE,
      },
    })
  );
  // Carregar canvas apenas uma vez
  useEffect(() => {
    if (!initialLoadComplete) {
      setInitialLoadComplete(true);
    }
  }, [initialLoadComplete]);
  
  // Configurar o evento de unload para mostrar popup de confirmação
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Isso ativa o popup de confirmação do navegador
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Carregar canvas quando o ID da tela mudar
  useEffect(() => {
    if (currentScreenId && userId && projectId) {
      loadCanvasForScreen(currentScreenId);
    }
  }, [currentScreenId, userId, projectId]);

  // Simplified functions using services
  const loadCanvasForScreen = async (screenId) => {
    try {
      const components = await CanvasApi.loadCanvas(
        userId,
        projectId,
        screenId
      );
      setCanvasComponents(components);
    } catch (error) {
      setCanvasComponents([]);
    }
  };

  const addComponentToCanvas = (sourceComponent) => {
    const newComponent = dragHelpers.createNewComponent(
      sourceComponent,
      { x: 0, y: 0 },
      componentIdCounter
    );
    addComponent(newComponent);
  };
  
  const handleSaveCanvas = async () => {
    try {
      const canvasData = JSON.stringify(canvasComponents);
      await CanvasApi.saveCanvas(
        userId,
        projectId,
        currentScreenId,
        canvasData
      );
      window.alert("Salvo com sucesso!");
    } catch (error) {
      alert("Erro ao salvar canvas.");
    }
  };

  const handleDeleteComponent = (componentId) => {
    if (window.confirm("Tem certeza que deseja excluir este componente?")) {
      removeComponent(componentId);
    }
  };

  const handleClearCanvas = () => {
    if (window.confirm("Tem certeza que deseja limpar o canvas?")) {
      clearCanvas();
    }
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    const activeData = active.data.current;

    if (over && over.id === "canvas") {
      const sourceComponent = canvasComponents.find((c) => c.id === active.id);

      const canvasElement = document.getElementById("canvas-area");
      const canvasRect = canvasElement.getBoundingClientRect();

      const draggedNode = active.node;
      const elementWidth = draggedNode?.offsetWidth || sourceComponent.width;
      const elementHeight = draggedNode?.offsetHeight || sourceComponent.height;

      if (activeData.inCanvas) {
        const newPosition = dragHelpers.calculateMovePosition(
          sourceComponent.position,
          event.delta,
          canvasRect,
          elementWidth,
          elementHeight
        );
        updateComponentPosition(active.id, newPosition);
      }
    }
  }

  const handleScreensData = (screensData) => {
    const sortedScreens = [...screensData].sort((a, b) => a.tela - b.tela);
    setAvailableScreens(sortedScreens);
  };

  const handleScreenSelect = async (screenId) => {
    await CanvasApi.saveCanvas(
      userId,
      projectId,
      currentScreenId,
      JSON.stringify(canvasComponents)
    );
    selectScreen(screenId);
    selectComponent(null);
  };

  const handleDeleteScreen = (screenId) => {
    deleteScreen(
      screenId,
      () => {
        window.alert("Tela deletada com sucesso!");
        // Aqui você pode adicionar algo, tipo: toast de sucesso, etc.
      },
      (error) => {
        window.alert("Erro ao deletar a tela.");
        // Aqui você pode adicionar algo, tipo: toast de erro
      }
    );
  };

  const startEditingScreenName = () => {
    const selectedScreen = availableScreens.find(
      (screen) => screen.tela === currentScreenId
    );
    setIsEditingScreenName(true);
    setTemporaryScreenName(
      selectedScreen?.nomeTela ?? `Tela ${currentScreenId}`
    );
  };

  const handleScreenNameSubmit = () => {
    updateScreenName(currentScreenId, temporaryScreenName);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={dragSensors}>
      <div className="min-h-screen flex">
        {!initialLoadComplete && (
          <UserCanvasLoader
            onDataLoaded={setCanvasComponents}
            screens={handleScreensData}
            shouldLoad={canvasComponents.length === 0}
          />
        )}
        {/* New fixed left sidebar */}
        <div className="w-64 bg-gray-100 h-screen fixed left-0 p-4 z-30 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            {isEditingScreenName ? (
              <div className="flex flex-col">
                <input
                  className="border px-2 py-1 text-sm rounded"
                  value={temporaryScreenName}
                  onChange={(e) => setTemporaryScreenName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleScreenNameSubmit();
                  }}
                />
                <button
                  className="text-blue-600 text-sm self-start"
                  onClick={handleScreenNameSubmit}
                >
                  Salvar
                </button>
              </div>
            ) : (
              <h2 className="text-lg text-black font-semibold">
                {currentScreenName ?? `Tela ${currentScreenId}`}
              </h2>
            )}
            {availableScreens.length > 0 && (
            <button
              className="ml-1 text-xs text-gray-500 hover:text-gray-800"
              onClick={startEditingScreenName}
            >
              ✏️
            </button>
            )}
          </div>
          {/* Component List */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {canvasComponents.map((component) => (
                <div
                  key={component.id}
                  onClick={() => selectComponent(component)}
                  className={`p-2 rounded cursor-pointer transition-colors ${
                    selectedComponent?.id === component.id
                      ? "bg-blue-500 text-white"
                      : "bg-black hover:bg-gray-200"
                  }`}
                >
                  {component.type} - {component.name}
                </div>
              ))}
            </div>
          </div>
          <button
            className=" cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={async () => {
              if (currentScreenId) {
                await handleSaveCanvas();
              } else {
                const newID = await createNewScreen();
                if (newID) {
                  handleSaveCanvas();
                }
              }
            }}
          >
            Salvar
          </button>
          <button
            onClick={handleClearCanvas}
            className=" bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Limpar Canvas
          </button>
        </div>

        {/* Main content area with top components bar and canvas */}
        <div className="ml-64 flex-1 w-auto mr-64 relative">
          {/* Components bar now on top */}
          <div className="fixed top-0 w-full h-[128px] p-5 left-0 right-64 z-20 bg-white border-b shadow-sm">
              <ComponentsSidebar
                availableComponents={DEFAULT_COMPONENTS}
                onComponentClick={addComponentToCanvas}
              />
          </div>

          {/* Canvas and properties section */}
          <div className="flex gap-6 z-10 pt-32">
            {/* Canvas area */}
            <div className="flex-1 overflow-auto relative h-[calc(100vh-80px)]">
              <DroppableArea id="canvas">
                <div
                  id="canvas-area"
                  style={{
                    backgroundColor: "#ffffff",
                    width: `${CANVAS_DIMENSIONS.width}px`,
                    height: `${CANVAS_DIMENSIONS.height}px`,
                  }}
                  className="relative transition-colors cursor-move"
                >                 
                  {canvasComponents.map((component) => (
                    <MoveableDesignComponent
                      key={component.id}
                      id={component.id}
                      position={component.position}
                      inCanvas={true}
                      onClick={() => selectComponent(component)}
                      size={{
                        width: component.width,
                        height: component.height,
                      }}
                      content={component.content}
                      colorComponent={component.colorComponent}
                    >
                      {renderComponent(
                        component
                      )}
                    </MoveableDesignComponent>
                  ))}
                </div>
              </DroppableArea>
            </div>
          </div>
          {/* Bottom Screen Tabs */}
          <div className="fixed bottom-0 left-64 right-0 bg-gray-100 border-t border-gray-300 shadow-inner h-16 flex items-center px-4 space-x-4 z-10">
            {availableScreens.map((screen) => (
              <div
                key={screen.tela}
                className={`relative pl-4 pr-6 py-2 ${
                  currentScreenId === screen.tela ? `bg-amber-700` : `bg-white`
                }  border rounded shadow-sm text-gray-800 hover:bg-blue-100 cursor-pointer flex items-center space-x-2`}
              >
                {/* Botão X no canto superior direito */}
                <button
                  className="absolute top-[-3px] right-0 text-gray-400 hover:text-red-500 mr-0 flex items-center justify-center text-lg leading-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteScreen(screen.tela);
                  }}
                >
                  x
                </button>
                <span
                  onClick={() => {
                    handleScreenSelect(screen.tela);
                  }}
                >
                  {screen.nomeTela ?? `Tela ${screen.tela}`}
                </span>
              </div>
            ))}
            <button
              className="px-4 py-2 bg-green-500 text-white text-base rounded-full shadow-sm hover:bg-green-600 transition"
              onClick={createNewScreen}
            >
              +
            </button>
          </div>
        </div>
        {/* Properties panel */}
        <ComponentProperties
          className="z-10"
          component={selectedComponent}
          onUpdateSize={updateComponentSize}
          onUpdateContent={updateComponentContent}
          onUpdateColor={updateComponentColor}
          onDelete={handleDeleteComponent}
          onUpdateName={updateComponentName}
          onUpdateMandatory={updateComponentMandatory}
          onUpdateRole={updateComponentRole}
          onUpdateRules={updateComponentRules}
        />
        {/* Add your new sidebar content here */}
      </div>
    </DndContext>
  );
}
