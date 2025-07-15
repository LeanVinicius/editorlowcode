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
import { ChevronRight, X, Plus } from 'lucide-react';
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
    if (!isEditingScreenName) {
      const selectedScreen = availableScreens.find(
        (screen) => screen.tela === currentScreenId
      );
      setIsEditingScreenName(true);
      setTemporaryScreenName(
        selectedScreen?.nomeTela ?? `Tela ${currentScreenId}`
      );
    }
    else {
      setIsEditingScreenName(false);
    }
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
        <div className="w-64 bg-[rgba(254,254,254,1)] h-screen fixed left-0 p-5 z-30 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between mb-4">
            {isEditingScreenName ? (
              <div className="flex flex-col">
                <input
                  className="w-48 border border-gray-300 px-3 py-2 text-[20px] font-bold text-[rgba(18,49,50,0.73)] rounded 
                  focus:border-[rgba(253,86,42,1)] focus:ring-1 focus:ring-[rgba(253,86,42,1)] focus:outline-none"
                  type="text"
                  value={temporaryScreenName}
                  onChange={(e) => setTemporaryScreenName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleScreenNameSubmit();
                  }}
                />
              </div>
            ) : (
              <p className="text-[20px] font-bold text-[rgba(18,49,50,1)]">
                {currentScreenName ?? `Tela ${currentScreenId}`}
              </p>
            )}
            {availableScreens.length > 0 && (
              <button
                className="ml-1 text-xs text-gray-500 hover:text-gray-800"
                onClick={startEditingScreenName}

              >
                <img src="/icons/edit.png" className="w-4 h-4"></img>
              </button>
            )}
          </div>
          {/* Component List */}
          <div className="flex-1 pt-9 overflow-y-auto pb-5">
            <div className="space-y-5">
              {canvasComponents.map((component) => (
                <div
                  key={component.id}
                  onClick={() => selectComponent(component)}
                  className={`h-10 w-48 flex justify-between items-center  py-1 px-3 leading-none font-semibold text-[16px] 
                    rounded cursor-pointer ${selectedComponent?.id === component.id
                      ? "bg-[rgba(18,49,50,1)] text-white"
                      : "bg-[rgba(18,49,50,0.15)] text-[rgba(18,49,50,1)] hover:bg-gray-200"
                    }`}
                >
                  {component.name}
                  <ChevronRight className={`${selectedComponent?.id === component.id ? "text-white" : "text-[rgba(18,49,50,1)]"}`} />
                </div>
              ))}
            </div>
          </div>
          <button
            className="h-9 leading-none cursor-pointer text-[20px] font-semibold bg-[rgba(18,49,50,1)] hover:bg-[rgba(28,66,67,1)]
             text-white px-3 py-1 rounded-3xl mb-4 mt-4"
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
            className="h-9 leading-none cursor-pointer text-[20px] font-semibold bg-white hover:bg-[rgba(245,245,245,1)]
             text-[rgba(18,49,50,1)] px-3 py-1 rounded-3xl border border-[rgba(18,49,50,1)] mb-6"
          >
            Limpar Tela
          </button>
        </div>

        {/* Main content area with top components bar and canvas */}
        <div className="ml-64 flex-1 w-auto mr-64 relative">
          {/* Components bar now on top */}
          <div className="fixed top-0 w-full h-[128px] p-5 left-0 right-64 z-20 bg-white border-b shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
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
          <div className="fixed bottom-0 left-64 right-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] h-16 flex items-center px-5 space-x-3 z-10">
            {availableScreens.map((screen) => (
              <div
                key={screen.tela}
                className={` font-semibold  text-[20px] pl-3 pr-2 py-2 ${currentScreenId === screen.tela ? `bg-[rgba(18,49,50,1)] text-white hover:bg-[rgba(28,66,67,1)]`
                  : `bg-white text-[rgba(18,49,50,1)] border border-[rgba(130,130,130,0.5)] hover:bg-[rgba(245,245,245,1)]`
                  } rounded-[5px] cursor-pointer flex items-center space-x-2`}
              >
                {/* Botão X no canto superior direito */}

                <span
                  onClick={() => {
                    handleScreenSelect(screen.tela);
                  }}
                >
                  {screen.nomeTela ?? `Tela ${screen.tela}`}
                </span>
                <X
                  className={` h-[15px] w-[15px] ${currentScreenId === screen.tela ? `text-white hover:text-gray-400` : `text-[rgba(18,49,50,1)] hover:text-[#6aaeb1]`} self-start`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteScreen(screen.tela);
                  }}
                >

                </X>
              </div>
            ))}
            <div
              className=" w-36 pl-3 pr-2 py-2 gap-2 bg-[rgba(18,49,50,0.15)] text-[rgba(18,49,50,1)] hover:bg-gray-200 border border-[rgba(130,130,130,0.5)] rounded-[5px] cursor-pointer flex items-center"
              onClick={createNewScreen}
            >
              <Plus className='w-[18px] h-[18px]'></Plus>
              <p className='font-semibold text-[20px]'>Nova Tela</p>
            </div>
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
