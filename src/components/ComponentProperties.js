import React, { useCallback } from "react";
import { useComponentProperties } from "@/hooks/useComponentProperties";
import { INTERACTIVE_COMPONENT_TYPES } from "@/constants/Components";
import { DATE_COMPONENT_TYPES } from "@/constants/Components";
import { OPTION_COMPONENT_TYPES } from "@/constants/Components";
import { ComponentBasicFields } from "@/properties/ComponentBasicFields";
import { ComponentSizeFields } from "@/properties/ComponentSizeFields";
import { ComponentColorField } from "@/properties/ComponentColorField";
import { ComponentMandatoryField } from "@/properties/ComponentMandatoryField";
import { ComponentActions } from "@/properties/ComponentActions";
import { ComponentRoleField } from "@/properties/ComponentRoleField";
import { ComponentRulesField } from "@/properties/ComponentRulesField";
import { ComponentInputFields } from "@/properties/ComponentInputFields";
import { ComponentOptionsField } from "@/properties/ComponentOptionsField";

/**
 * @param {object} props - As propriedades do componente.
 * @param {object | null} props.component - O objeto do componente atualmente selecionado cujas propriedades devem ser exibidas e editadas. Se for `null`, o painel não é renderizado.
 * @param {(componentId: string, newSize: { width: number, height: number }) => void} props.onUpdateSize - Função chamada quando o tamanho do componente é alterado.
 * @param {(componentId: string, newContent: string) => void} props.onUpdateContent - Função chamada quando o conteúdo do componente é alterado.
 * @param {(componentId: string, newColor: string) => void} props.onUpdateColor - Função chamada quando a cor do componente é alterada.
 * @param {(componentId: string) => void} props.onDelete - Função chamada quando o componente deve ser excluído.
 * @param {(componentId: string, newName: string) => void} props.onUpdateName - Função chamada quando o nome do componente é alterado.
 * @param {(componentId: string, newMandatory: string) => void} props.onUpdateMandatory - Função chamada quando o status de obrigatoriedade do componente é alterado.
 * @param {(componentId: string, newMulti: boolean) => void} [props.onUpdateMulti] - Função opcional chamada quando a propriedade 'multi' do componente é alterada (para selects).
 * @param {(componentId: string, newOptions: string[]) => void} [props.onUpdateOptions] - Função opcional chamada quando as opções do componente são alteradas (para selects/checkboxes).
 * @param {(componentId: string, newRole: string) => void} [props.onUpdateRole] - Função opcional chamada quando a propriedade 'role' do componente é alterada (para botões).
 * @param {(componentId: string, newRules: string) => void} [props.onUpdateRules] - Função opcional chamada quando a propriedade 'rules' do componente é alterada (para inputs).
* @param {(componentId: string, newInformation: string) => void} [props.onUpdateInformation] - Função opcional chamada quando a propriedade 'information' do componente é alterada (para inputs).
* @param {(componentId: string, newRestriction: string) => void} [props.onUpdateRestriction] - Função opcional chamada quando a propriedade 'restriction' do componente é alterada (para inputs).
* @returns {JSX.Element | null} Renderiza o painel lateral para visualizar e editar as propriedades de um componente selecionado, ou `null` se nenhum componente estiver selecionado.
 *
 * Este componente utiliza o hook `useComponentProperties` para gerenciar o estado local do formulário de propriedades e sincronizá-lo com o componente selecionado. Ele renderiza condicionalmente diferentes campos de propriedade com base no tipo do componente.
 */
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
  onUpdateRole,
  onUpdateRules,
  onUpdateInformation,
  onUpdateRestriction
}) {
  const { formData, updateField } =
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
  const handleRulesChange = (value) => {
    updateField("rules", value);
    onUpdateRules(component.id, value);
  }
  const handleInformationChange = (value) => {
    updateField("information", value);
    onUpdateInformation(component.id, value);
  }
  const handleRestrictionChange = (value) => {
    updateField("restriction", value);
    onUpdateRestriction(component.id, value);
  }
  const handleOptionsChange = (value) => {
    updateField("options", value);
    onUpdateOptions(component.id, value);
  }


  const isInteractiveComponent = INTERACTIVE_COMPONENT_TYPES.includes(component.type);
  const isOptionComponent = OPTION_COMPONENT_TYPES.includes(component.type);
  const isDateComponent = !DATE_COMPONENT_TYPES.includes(component.type);
  const isButtonComponent = component.type === "button";
  const isInputComponent = component.type === "input";


  return (
    <div className="bg-[rgba(254,254,254,1)] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-64 rounded-lg z-30 h-screen fixed right-0 flex flex-col justify-between overflow-auto items-center">
      <div className="flex flex-col space-y-5">
        <h2 className="text-[20px] font-bold text-[rgba(18,49,50,1)] pb-6">
          Propriedades do Componente
        </h2>

        <ComponentBasicFields
          name={formData.name}
          
          content={formData.content}
          onNameChange={handleNameChange}
          onContentChange={handleContentChange}
        />

        {isDateComponent && (<ComponentSizeFields
          width={formData.width}
          height={formData.height}
          onSizeChange={handleSizeChange}
        />)}

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
        {isInputComponent && (
          <ComponentInputFields
            information={formData.information}
            restriction={formData.restriction}
            onInformationChange={handleInformationChange}
            onRestrictionChange={handleRestrictionChange}
          />
        )}
        {isOptionComponent && (
          <ComponentOptionsField
            options={formData.options}
            onOptionsChange={handleOptionsChange}
          />
        )}
        <ComponentRulesField
          rules={formData.rules}
          onRulesChange={handleRulesChange}
        />

      </div>




      <ComponentActions onDelete={() => onDelete(component.id)} />
    </div>
  );
}
