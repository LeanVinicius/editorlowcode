import { ComponentRenderer } from "./ComponentRenderer";
import { renderComponent } from "@/utils/renderComponent";

export function ComponentsSidebar({ availableComponents, onCanvasColorChange, onComponentClick }) {
  return (
    <div className="w-full flex flex-col justify-between  bg-amber-700 p-4 rounded-lg">
      <h2 className="text-lg flex  justify-center font-black text-black mb-4">Componentes</h2>
      <div className="flex flex-row wrap-normal">
        
        {availableComponents.map(component => (
          <div
            key={component.id}
            onClick={() => onComponentClick(component)}
            className = "cursor-pointer p-2 bg-white rounded shadow hover:bg-gray-100"
            
          >
            {component.content}
          </div>
        ))}
      </div>

      {/*<button
        onClick={onCanvasColorChange}
        className="mt-4 w-0.5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Mudar Cor do Canvas
      </button>*/}
    </div>
  );
}