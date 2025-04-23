import { ComponentRenderer } from "./ComponentRenderer";
import { renderComponent } from "@/utils/renderComponent";

export function ComponentsSidebar({ availableComponents, onCanvasColorChange }) {
  return (
    <div className="w-64 flex flex-col justify-between bg-gray-100 p-4 rounded-lg">
      <div>
        <h2 className="text-lg font-black text-black mb-4">Componentes</h2>
        {availableComponents.map(component => (
          <ComponentRenderer
            key={component.id}
            id={component.id}
            inCanvas={false}
            size = {{ width: component.width, height: component.height}}
            colorComponent={component.colorComponent}
          >
            {renderComponent(component.type, component.content, component.colorComponent)}
          </ComponentRenderer>
        ))}
      </div>

      <button
        onClick={onCanvasColorChange}
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Mudar Cor do Canvas
      </button>
    </div>
  );
}