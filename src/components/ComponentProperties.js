import React, { useEffect, useState } from "react";
import { useComponentProperties } from "@/hooks/useComponentProperties";
import { INTERACTIVE_COMPONENT_TYPES } from "@/constants/Components";
import { OPTION_COMPONENT_TYPES } from "@/constants/Components";
import { ComponentBasicFields } from "@/properties/ComponentBasicFields";
import { ComponentSizeFields } from "@/properties/ComponentSizeFields";
import { ComponentColorField } from "@/properties/ComponentColorField";
import { ComponentMandatoryField } from "@/properties/ComponentMandatoryField";
import { ComponentActions } from "@/properties/ComponentActions";
import { ComponentRoleField } from "@/properties/ComponentRoleField";

export function ComponentProperties({
  component,
  onUpdateSize,
  onUpdateContent,
  onUpdateColor,
  onDelete,
  onUpdateName,
  onUpdateMandatory,
  onUpdateMulti,
  onUpdateOptions,
  onUpdateRole
}) {
  const { formData, updateField, isEditingName, setIsEditingName } =
    useComponentProperties(component);

  if (!component) {
    return null;
  }
  const handleSizeChange = (field, value) => {
    const numericValue = parseInt(value, 10);
    updateField(field, numericValue);
    const newSize = {
      width: field === "width" ? numericValue : formData.width,
      height: field === "height" ? numericValue : formData.height,
    };
    onUpdateSize(component.id, newSize);
  };
  const handleContentChange = (value) => {
    updateField("content", value);
    onUpdateContent(component.id, value);
  };

  const handleColorChange = (value) => {
    updateField("color", value);
    onUpdateColor(component.id, value);
  };

  const handleNameChange = (value) => {
    updateField("name", value);
    onUpdateName(component.id, value);
  };

  const handleMandatoryChange = (value) => {
    updateField("mandatory", value);
    onUpdateMandatory(component.id, value);
  };
  const handleRoleChange = (value) => {
    updateField("role", value);
    onUpdateRole(component.id, value);
  };

  const isInteractiveComponent = INTERACTIVE_COMPONENT_TYPES.includes(component.type);
  const isOptionComponent = OPTION_COMPONENT_TYPES.includes(component.type);
  const isButtonComponent = component.type === "button";


  return (
    <div className="w-64 bg-amber-800 p-4 rounded-lg z-30 overflow-auto h-screen fixed right-0">
      <div className="pb-16">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Propriedades do Componente
        </h2>

        <ComponentBasicFields
          name={formData.name}
          componentType={component.type}
          content={formData.content}
          isEditingName={isEditingName}
          onNameClick={() => setIsEditingName(true)}
          onNameChange={handleNameChange}
          onNameEditComplete={() => setIsEditingName(false)}
          onContentChange={handleContentChange}
        />

        <ComponentSizeFields
          width={formData.width}
          height={formData.height}
          onSizeChange={handleSizeChange}
        />

        <ComponentColorField
          color={formData.color}
          onColorChange={handleColorChange}
        />

        {isButtonComponent && (
          <ComponentRoleField
            role={formData.role}
            onRoleChange={handleRoleChange}
          />
        )}


        {isInteractiveComponent && (
          <ComponentMandatoryField
            mandatory={formData.mandatory}
            onMandatoryChange={handleMandatoryChange}
          />
        )}
      </div>

      <ComponentActions onDelete={() => onDelete(component.id)} />
    </div>
  );
  // Atualiza os inputs sempre que um novo componente for selecionado
  // useEffect(() => {
  //   setLocalWidth(component?.width || 0);
  //   setLocalHeight(component?.height || 80);
  //   setLocalContent(component?.content || "");
  //   setLocalColor(component?.colorComponent || "#ffffff");
  //   setLocalName(component?.name || "");
  //   setLocalMandatory(component?.mandatory || "opcional");
  //   setLocalMulti(component?.multi || false);
  //   setLocalOptions(component?.options || []);
  // }, [component]);

  // if (!component) {
  //   return null;
  // }

  // return (
  //   <div className="w-64 bg-amber-800 p-4 rounded-lg z-30 overflow-auto h-screen fixed right-0">
  //     <div className="pb-16">
  //       <h2 className="text-lg font-semibold mb-4">
  //         Propriedades do Componente
  //       </h2>
  //       <div className="mt-4">
  //         <label className="block mb-2">Nome:</label>
  //         {isEditingName ? (
  //           <span
  //             contentEditable
  //             suppressContentEditableWarning
  //             onBlur={(e) => {
  //               const newName = e.target.textContent;
  //               setIsEditingName(false);
  //               setLocalName(newName);
  //               onUpdateName(component.id, newName);
  //             }}
  //             onKeyDown={(e) => {
  //               if (e.key === "Enter") {
  //                 e.preventDefault();
  //                 e.target.blur();
  //               }
  //             }}
  //             className="block w-full px-3 py-2 bg-white rounded focus:outline-none"
  //           >
  //             {localName}
  //           </span>
  //         ) : (
  //           <div
  //             onClick={() => setIsEditingName(true)}
  //             className="px-3 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
  //           >
  //             {localName}
  //           </div>
  //         )}
  //       </div>
  //       <p>Tipo: {component.type}</p>

  //       <div className="mt-4">
  //         <label className="block mb-2">Texto:</label>
  //         <input
  //           type="text"
  //           value={localContent}
  //           onChange={(e) => {
  //             setLocalContent(e.target.value);
  //             onUpdateContent(component.id, e.target.value);
  //           }}
  //           className="w-full px-3 py-2 border rounded"
  //         />
  //       </div>

  //       <div className="mt-4">
  //         <label className="block mb-2">Largura (px):</label>
  //         <input
  //           type="number"
  //           value={localWidth}
  //           onChange={(e) => {
  //             const newWidth = parseInt(e.target.value);
  //             setLocalWidth(newWidth);
  //             onUpdateSize(component.id, {
  //               width: newWidth,
  //               height: localHeight,
  //             });
  //           }}
  //           className="w-full px-3 py-2 border rounded"
  //           min="50"
  //         />
  //       </div>

  //       <div className="mt-4">
  //         <label className="block mb-2">Altura (px):</label>
  //         <input
  //           type="number"
  //           value={localHeight}
  //           onChange={(e) => {
  //             const newHeight = parseInt(e.target.value);
  //             setLocalHeight(newHeight);
  //             onUpdateSize(component.id, {
  //               width: localWidth,
  //               height: newHeight,
  //             });
  //           }}
  //           className="w-full px-3 py-2 border rounded"
  //           min="30"
  //         />
  //       </div>
  //       <div className="mt-4">
  //         <label className="block mb-2">Cor:</label>
  //         <div className="flex gap-2">
  //           <input
  //             type="color"
  //             value={localColor}
  //             onChange={(e) => {
  //               setLocalColor(e.target.value);
  //               onUpdateColor(component.id, e.target.value);
  //             }}
  //             className="w-12 h-8 cursor-pointer"
  //           />
  //           <input
  //             type="text"
  //             value={localColor}
  //             onChange={(e) => {
  //               setLocalColor(e.target.value);
  //               onUpdateColor(component.id, e.target.value);
  //             }}
  //             className="w-full px-3 border rounded"
  //             placeholder="#000000 ou rgb(0,0,0)"
  //           />
  //         </div>
  //       </div>
  //       {(component.type === "input" ||
  //         component.type === "select" ||
  //         component.type === "checkbox" ||
  //         component.type === "toggle" ||
  //         component.type === "calendar") && (
  //           <div className="mt-4">
  //             <label className="block mb-2">Obrigatoriedade:</label>

  //             <label className="flex items-center space-x-2 mb-2">
  //               <input
  //                 type="radio"
  //                 name="obrigatoriedade"
  //                 value="obrigatorio"
  //                 className="form-radio h-5 w-5 text-blue-600"
  //                 onChange={(e) => {
  //                   onUpdateMandatory(component.id, e.target.value);
  //                   setLocalMandatory(e.target.value);
  //                 }}
  //                 checked={localMandatory === "obrigatorio"}
  //               />
  //               <span className="">Obrigatório</span>
  //             </label>

  //             <label className="flex items-center space-x-2">
  //               <input
  //                 type="radio"
  //                 name="obrigatoriedade"
  //                 value="opcional"
  //                 className="form-radio h-5 w-5 text-blue-600"
  //                 onChange={(e) => {
  //                   onUpdateMandatory(component.id, e.target.value);
  //                   setLocalMandatory(e.target.value);
  //                 }}
  //                 checked={localMandatory === "opcional"}
  //               />
  //               <span className="">Opcional</span>
  //             </label>
  //           </div>
  //         )}
  //       <div>text</div>
  //       <div>text</div>
  //       <div>text</div>
  //       <div>text</div>
  //     </div>
  //     <div className="fixed bottom-0 right-0 w-64 bg-amber-800">
  //       <button
  //         onClick={() => onDelete(component.id)}
  //         className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
  //       >
  //         Deletar
  //       </button>
  //     </div>
  //   </div>
  // );
}
