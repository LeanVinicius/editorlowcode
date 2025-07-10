import { useState, useEffect } from 'react';

/**
  * @typedef {object} ComponentPropertiesState
  * @property {object} formData - O estado atual do formulário de propriedades.
  * @property {function(string, any): void} updateField - Função para atualizar um campo específico no formData.
  * @property {boolean} isEditingName - Estado booleano indicando se o nome do componente está sendo editado.
  * @property {function(boolean): void} setIsEditingName - Função para definir o estado de edição do nome.
  */

/**
  * Hook customizado para gerenciar o estado e a lógica do painel de propriedades de um componente selecionado.
  * Ele mantém o estado do formulário de propriedades e o sincroniza com o componente real passado como prop.
  *
  * @param {object | null} component - O objeto do componente atualmente selecionado, ou null se nenhum componente estiver selecionado.
  * @returns {ComponentPropertiesState} O estado do formulário de propriedades e funções para manipulá-lo.
  */
export const useComponentProperties = (component) => {
  // NOTE : adicionar aqui qualquer propriedade nova
  const [formData, setFormData] = useState({
    width: 0,
    height: 80,
    content: '',
    color: '#ffffff',
    name: '',
    mandatory: 'opcional',
    multi: false,
    options: [],
    role: '',
    rules: [],
  });

  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    if (component) {
      setFormData({
        width: component.width || 0,
        height: component.height || 80,
        content: component.content || '',
        color: component.colorComponent || '#ffffff',
        name: component.name || '',
        mandatory: component.mandatory || 'opcional',
        multi: component.multi || false,
        options: component.options || [],
        role: component.role || '',
        rules: component.rules || [],
      });
    }
  }, [component]); // Dependência: Sincroniza quando o componente selecionado muda.

  /**
    * Atualiza um campo específico no estado do formulário de propriedades.
    * @param {string} field - O nome do campo a ser atualizado.
    * @param {any} value - O novo valor para o campo.
    */
  const updateField = (field, value) => {
    // Atualiza o formData de forma imutável.
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    /**
     * O estado atual do formulário de propriedades do componente selecionado.
     */
    formData,
    /**
     * Função para atualizar um campo específico no `formData`.
     */
    updateField,
    /**
     * Estado booleano que indica se o nome do componente está sendo editado.
     */
    isEditingName,
    /**
     * Função para definir o estado de edição do nome (`isEditingName`).
     */
    setIsEditingName
  };
};