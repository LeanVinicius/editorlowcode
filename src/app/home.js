"use client";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { ComponentRenderer } from "../components/ComponentRenderer";
import { DroppableArea } from "../components/DroppableArea";
import { useState, useEffect, use } from "react";
import { ComponentProperties } from "../components/ComponentProperties";
import { renderComponent } from "@/utils/renderComponent";
import { ComponentsSidebar } from "@/components/ComponentsSidebar";
import { UserCanvasLoader } from "@/utils/UserCanvasLoader";
import { useSearchParams } from "next/navigation";
import { deleteScreen } from "@/utils/deleteScreen";

export default function Home() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const projectId = searchParams.get("projectId");

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [screens, setScreens] = useState([]);
  const [selectScreen, setSelectScreen] = useState(1);
  const [editingScreenName, setEditingScreenName] = useState(false);
  const [newScreenName, setNewScreenName] = useState("");

  useEffect(() => {
    if (!initialLoadComplete) {
      setInitialLoadComplete(true);
    }
  }, []);

  useEffect(() => {
    if (selectScreen != null && userId && projectId) {
      setSelectedComponent(null);
      fetch(
        `https://xjvf-6soq-uwxw.n7c.xano.io/api:X-N9-OyD/desenho?usuario_id=${userId}&projeto_id=${projectId}&tela=${selectScreen}`
      )
        .then((res) => res.json())
        .then((dataString) => {
          if (!dataString || dataString === "null" || dataString === "[]") {
            setCanvasComponents([]); // <-- CORRETO
            return;
          }

          const jsonData =
            typeof dataString === "string"
              ? JSON.parse(dataString)
              : dataString;

          setCanvasComponents(
            jsonData.map((component, index) => ({
              ...component,
              id: `${component.type}-${Date.now()}-${index}`,
            }))
          );
        })
        .catch((err) => {
          console.error("Erro ao carregar canvas:", err);
        });
    }
  }, [selectScreen, userId, projectId]);

  // Componentes disponíveis na barra lateral
  const availableComponents = [
    {
      id: "button",
      content: "Botão",
      type: "button",
      width: 175,
      height: 41,
      colorComponent: "#000000",
    },
    {
      id: "text",
      content: "Texto",
      type: "heading",
      width: 175,
      height: 41,
      colorComponent: "#000000",
    },
    {
      id: "input",
      content: "Campo",
      type: "input",
      width: 175,
      height: 64,
      colorComponent: "#000000",
      mandatory: "opcional",
    },
    { id: "select", content: "Seleção", type: "select" },
    { id: "checkbox", content: "Checkbox", type: "checkbox" },
    { id: "calendar", content: "Data", type: "calendar" },
    { id: "toggle", content: "Opção", type: "toggle" },
    { id: "table", content: "Galeria", type: "slider" },
    { id: "kanbam", content: "Kanbam", type: "kanbam" },
  ];

  // Componentes colocados no canvas
  const [canvasComponents, setCanvasComponents] = useState([]);

  // Componente selecionado no canvas
  const [selectedComponent, setSelectedComponent] = useState(null);

  // ID counter para componentes adicionados ao canvas
  const [idCounter, setIdCounter] = useState(1);

  // Estado para armazenar o valor do background do canvas
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  // Função para adicionar um componente ao canvas
  function handleComponentSelect(component) {
    setSelectedComponent(component);
  }
  const addComponentToCenter = (sourceComponent) => {
    const canvasElement = document.getElementById("canvas-area");

    const newComponent = {
      id: `${sourceComponent.type}-${idCounter}`,
      content: sourceComponent.content,
      type: sourceComponent.type,
      name: `${sourceComponent.type}-${idCounter}`,
      colorComponent: sourceComponent.colorComponent,
      position: {
        x: 0,
        y: 0,
      },
      width: sourceComponent.width,
      height: sourceComponent.height,
      mandatory: sourceComponent.mandatory,
    };
    setCanvasComponents((prev) => [...prev, newComponent]);
    setIdCounter((prev) => prev + 1);
  };

  const clearCanvas = () => {
    if (window.confirm("Tem certeza que deseja limpar o canvas?")) {
      setCanvasComponents([]);
      setSelectedComponent(null);
    }
  };

  // Configurar sensores para melhor controle do arrasto
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Distância mínima para iniciar o arrasto
      },
    })
  );

  // Função para carregar o canvas do usuário
  const handleLoadJson = (jsonString) => {
    try {
      if (!jsonString || jsonString === "[]") {
        setCanvasComponents([]);
        return;
      }

      const jsonData =
        typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
      if (Array.isArray(jsonData)) {
        setCanvasComponents(
          jsonData.map((component) => ({
            ...component,
            id: `${component.type}-${idCounter + Math.random()}`,
          }))
        );
      } else {
        setCanvasComponents([]);
      }
    } catch (error) {
      setCanvasComponents([]);
    }
  };

  const handleScreens = (data) => {
    const sorted = [...data].sort((a, b) => a.tela - b.tela);
    setScreens(sorted);
  };

  const createNewScreen = async () => {
    if (!userId || !projectId) return;

    // Descobre a próxima tela disponível
    const nextTela =
      screens.length > 0 ? Math.max(...screens.map((s) => s.tela)) + 1 : 1;

    const emptyCanvas = [];

    try {
      const response = await fetch(
        "https://xjvf-6soq-uwxw.n7c.xano.io/api:X-N9-OyD/desenho",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: userId,
            projeto_id: projectId,
            tela: nextTela,
            desenho: JSON.stringify(emptyCanvas),
          }),
        }
      );

      const result = await response.json();

      // Atualiza lista de telas com a nova
      const novaTelaObj = { tela: nextTela, nomeTela: `Tela ${nextTela}` };
      setScreens((prev) =>
        [...prev, novaTelaObj].sort((a, b) => a.tela - b.tela)
      );

      setCanvasComponents([]);
      setSelectScreen(nextTela);
    } catch (error) {
      console.error("Erro ao criar nova tela:", error);
      alert("Erro ao criar nova tela.");
    }
  };

  const handleScreenNameChange = async (tela, newName) => {
    try {
      await fetch(
        "https://xjvf-6soq-uwxw.n7c.xano.io/api:X-N9-OyD/desenho/alterarNome",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: userId,
            projeto_id: projectId,
            tela: tela,
            nomeTela: newName,
          }),
        }
      );

      // Atualiza a lista de telas localmente
      setScreens((prev) =>
        prev.map((screen) =>
          screen.tela === tela ? { ...screen, nomeTela: newName } : screen
        )
      );

      setEditingScreenName(null);
      setNewScreenName("");
    } catch (err) {
      console.error("Erro ao renomear a tela:", err);
      alert("Erro ao renomear a tela.");
    }
  };
  // Função para salvar o canvas do usuário
  const sendCanvasToEndpoint = async (canvasData) => {
    try {
      const response = await fetch(
        "https://xjvf-6soq-uwxw.n7c.xano.io/api:X-N9-OyD/desenho",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: userId,
            projeto_id: projectId,
            tela: selectScreen,
            desenho: canvasData,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {}
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    const activeData = active.data.current;

    if (over && over.id === "canvas") {
      const sourceComponent = activeData.inCanvas
        ? canvasComponents.find((c) => c.id === active.id)
        : availableComponents.find((c) => c.id === active.id);

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

        relativeX = Math.max(
          0,
          Math.min(relativeX, canvasRect.width - elementWidth)
        );
        relativeY = Math.max(
          0,
          Math.min(relativeY, canvasRect.height - elementHeight)
        );

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

          setCanvasComponents((prev) => [...prev, newComponent]);
          setIdCounter((prev) => prev + 1);
        }
      } else {
        setCanvasComponents((prev) =>
          prev.map((component) => {
            if (component.id === active.id) {
              const newX = component.position.x + event.delta.x;
              const newY = component.position.y + event.delta.y;

              return {
                ...component,
                position: {
                  x: Math.max(
                    0,
                    Math.min(newX, canvasRect.width - elementWidth)
                  ),
                  y: Math.max(
                    0,
                    Math.min(newY, canvasRect.height - elementHeight)
                  ),
                },
              };
            }
            return component;
          })
        );
      }
    }
  }

  const handleContentUpdate = (componentId, newContent) => {
    setCanvasComponents((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === componentId) {
          return {
            ...component,
            content: newContent,
          };
        }
        return component;
      })
    );
  };
  const handleNameUpdate = (componentId, newName) => {
    setCanvasComponents((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === componentId) {
          return {
            ...component,
            name: newName,
          };
        }
        return component;
      })
    );
  };

  const handleUpdateSize = (componentId, newSize) => {
    setCanvasComponents((prevComponents) =>
      prevComponents.map((component) => {
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
  };
  const handleUpdateColor = (componentId, newColor) => {
    setCanvasComponents((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === componentId) {
          return {
            ...component,
            colorComponent: newColor,
          };
        }

        return component;
      })
    );
  };
  const handleMandatoryUpdate = (componentId, value) => {
    setCanvasComponents((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === componentId) {
          return {
            ...component,
            mandatory: value,
          };
        }
        return component;
      })
    );
  };
  const deleteComponent = (componentId) => {
    if (window.confirm("Tem certeza que deseja excluir este componente?")) {
      setCanvasComponents((prevComponents) =>
        prevComponents.filter((component) => component.id !== componentId)
      );
      if (selectedComponent?.id === componentId) {
        setSelectedComponent(null);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex">
        {!initialLoadComplete && (
          <UserCanvasLoader
            onDataLoaded={handleLoadJson}
            screens={handleScreens}
            shouldLoad={canvasComponents.length === 0}
          />
        )}
        {/* New fixed left sidebar */}
        <div className="w-64 bg-gray-100 h-screen fixed left-0 p-4 z-10 flex flex-col">
          <h2 className="text-lg text-black font-semibold mb-4">
            Left Sidebar
          </h2>
          {/* Component List */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {canvasComponents.map((component) => (
                <div
                  key={component.id}
                  onClick={() => handleComponentSelect(component)}
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
              // Lógica para salvar o canvas
              const canvasData = JSON.stringify(canvasComponents);
              const result = await sendCanvasToEndpoint(canvasData);
              window.alert("Salvo com sucesso!");
            }}
          >
            Salvar
          </button>
          <button
            onClick={clearCanvas}
            className=" bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Limpar Canvas
          </button>
        </div>

        {/* Main content area with top components bar and canvas */}
        <div className="ml-64 flex-1 w-auto mr-64 relative">
          {/* Components bar now on top */}
          <div className="fixed top-0 left-64 right-64 z-20 bg-white border-b shadow-sm">
            <div className="min-w-max">
              <ComponentsSidebar
                availableComponents={availableComponents}
                onComponentClick={addComponentToCenter}
              />
            </div>
          </div>

          {/* Canvas and properties section */}
          <div className="flex gap-6 z-10 pt-28">
            {/* Canvas area */}
            <div className="flex-1 overflow-auto relative h-[calc(100vh-80px)]">
              <DroppableArea id="canvas">
                <div
                  id="canvas-area"
                  style={{
                    backgroundColor: canvasColor,
                    width: "2000px",
                    height: "2000px",
                  }}
                  className="relative rounded-lg transition-colors cursor-move"
                >
                  {canvasComponents.map((component) => (
                    <ComponentRenderer
                      key={component.id}
                      id={component.id}
                      position={component.position}
                      inCanvas={true}
                      onClick={() => handleComponentSelect(component)}
                      size={{
                        width: component.width,
                        height: component.height,
                      }}
                      content={component.content}
                      colorComponent={component.colorComponent}
                    >
                      {renderComponent(
                        component.type,
                        component.content,
                        component.colorComponent
                      )}
                    </ComponentRenderer>
                  ))}
                </div>
              </DroppableArea>
            </div>
          </div>
          <div className="fixed bottom-0 left-64 right-0 bg-gray-100 border-t border-gray-300 shadow-inner h-16 flex items-center px-4 space-x-4">
            {screens.map((item) => (
              <div
                key={item.tela}
                className={`relative pl-4 pr-6 py-2 ${selectScreen === item.tela ? `bg-amber-700` : `bg-white`}  border rounded shadow-sm text-gray-800 hover:bg-blue-100 cursor-pointer flex items-center space-x-2`}
              >
                {/* Botão X no canto superior direito */}
                <button
                  className="absolute top-[-3px] right-0 text-gray-400 hover:text-red-500 mr-0 flex items-center justify-center text-lg leading-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteScreen({
                      userId,
                      projectId,
                      telaId: item.tela,
                      onSuccess: () => {
                        setScreens((prev) =>
                          prev.filter((s) => s.tela !== item.tela)
                        );
                        if (selectScreen === item.tela) {
                          setCanvasComponents([]);
                          setSelectScreen(null);
                        }
                      },
                      onError: () => {
                        alert("Erro ao deletar a tela.");
                      },
                    });
                  }}
                >
                  x
                </button>
                {editingScreenName === item.tela ? (
                  <>
                    <input
                      className="border px-2 py-1 text-sm rounded"
                      value={newScreenName}
                      onChange={(e) => setNewScreenName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          handleScreenNameChange(item.tela, newScreenName);
                      }}
                    />
                    <button
                      className="text-blue-600 text-sm"
                      onClick={() =>
                        handleScreenNameChange(item.tela, newScreenName)
                      }
                    >
                      Salvar
                    </button>
                  </>
                ) : (
                  <>
                    <span onClick={() => setSelectScreen(item.tela)}>
                      {item.nomeTela ?? `Tela ${item.tela}`}
                    </span>
                    <button
                      className="ml-1 text-xs text-gray-500 hover:text-gray-800"
                      onClick={() => {
                        setEditingScreenName(item.tela);
                        setNewScreenName(item.nomeTela ?? `Tela ${item.tela}`);
                      }}
                    >
                      ✏️
                    </button>
                  </>
                )}
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
          onUpdateSize={handleUpdateSize}
          onUpdateContent={handleContentUpdate}
          onUpdateColor={handleUpdateColor}
          onDelete={deleteComponent}
          onUpdateName={handleNameUpdate}
          onUpdateMandatory={handleMandatoryUpdate}
        />
        {/* Add your new sidebar content here */}
      </div>
    </DndContext>
  );
}
