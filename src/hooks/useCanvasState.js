import { useState, useCallback } from 'react';
import { ComponentHelpers } from '../utils/ComponentHelpers';

export const useCanvasState = () => {
  /**
   * Hook customizado para gerenciar o estado dos componentes no canvas.
   * Inclui funções para adicionar, remover, atualizar e selecionar componentes,
   * além de controlar o estado de seleção e um contador de IDs.
   */
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentIdCounter, setComponentIdCounter] = useState(1);

  /**
   * Atualiza o conteúdo de um componente específico.
   *
   * @param {string} componentId - O ID do componente a ser atualizado.
   * @param {*} newContent - O novo conteúdo para o componente.
   * @returns {void}
   */
  const updateComponentContent = useCallback((componentId, newContent) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'content', newContent)
    );
  }, []);

  /**
     * Atualiza o nome de um componente específico.
     * @param {string} componentId - O ID do componente a ser atualizado.
     * @param {string} newName - O novo nome para o componente.
     */
  const updateComponentName = useCallback((componentId, newName) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'name', newName)
    );
  }, []);

  /**
    * Atualiza o tamanho de um componente específico.
    * @param {string} componentId - O ID do componente a ser atualizado.
    * @param {object} newSize - O novo tamanho para o componente (e.g., { width, height }).
    */
  const updateComponentSize = useCallback((componentId, newSize) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.updateComponentSize(prevComponents, componentId, newSize)
    );
  }, []);

  /**
    * Atualiza a cor de um componente específico.
    * @param {string} componentId - O ID do componente a ser atualizado.
    * @param {string} newColor - A nova cor para o componente.
    */
  const updateComponentColor = useCallback((componentId, newColor) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'colorComponent', newColor)
    );
  }, []);

  /**
    * Atualiza o estado 'mandatory' (obrigatório) de um componente.
    * @param {string} componentId - O ID do componente a ser atualizado.
    * @param {boolean} value - O novo valor para a propriedade 'mandatory'.
    */
  const updateComponentMandatory = useCallback((componentId, value) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'mandatory', value)
    );
  }, []);

  /**
    * Atualiza o 'role' de um componente.
    * @param {string} componentId - O ID do componente a ser atualizado.
    * @param {string} newRole - O novo valor para a propriedade 'role'.
    */
  const updateComponentRole = useCallback((componentId, newRole) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'role', newRole)
    );
  }, []);

  const udpateComponentImformation = useCallback((componentId, newInformation) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'information', newInformation)
    );
  }, []);

  /**
    * Atualiza as regras de negócio de um componente.
    * @param {string} componentId - O ID do componente a ser atualizado.
    * @param {string} newRule - A nova regra para o componente.
    */
  const updateComponentRules = useCallback((componentId, newRule) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'rules', newRule)
    );
  }, []);

  /**
    * Atualiza a posição de um componente específico no canvas.
    * @param {string} componentId - O ID do componente a ser atualizado.
    * @param {object} newPosition - A nova posição para o componente (e.g., { x, y }).
    */
  const updateComponentPosition = useCallback((componentId, newPosition) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.updateComponentPosition(prevComponents, componentId, newPosition)
    );
  }, []);

  /**
   * Adiciona um novo componente ao canvas.
   * Incrementa o contador de IDs.
   *
   * @param {object} component - O objeto do componente a ser adicionado.
   * @returns {void}
   */
  const addComponent = useCallback((component) => {
    setCanvasComponents(prevComponents => [...prevComponents, component]);
    setComponentIdCounter(prevCounter => prevCounter + 1);
  }, []);

  /**
   * Remove um componente do canvas pelo seu ID.
   * Se o componente removido for o componente selecionado, deseleciona-o.
   *
   * @param {string} componentId - O ID do componente a ser removido.
   * @returns {void}
   */
  const removeComponent = useCallback((componentId) => {
    setCanvasComponents(prevComponents =>
      ComponentHelpers.removeComponent(prevComponents, componentId)
    );

    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }

  }, [selectedComponent]);

  /**
   * Limpa todos os componentes do canvas e deseleciona qualquer componente.
   *
   * @returns {void}
   */
  const clearCanvas = useCallback(() => {
    setCanvasComponents([]);
    setSelectedComponent(null);
  }, []);

  /**
   * Define o componente atualmente selecionado.
   *
   * @param {object|null} component - O componente a ser selecionado, ou `null` para deselecionar.
   * @returns {void}
   */
  const selectComponent = useCallback((component) => {
    setSelectedComponent(component);
  }, []);

  return {
    canvasComponents,
    selectedComponent,
    componentIdCounter,
    setCanvasComponents,
    updateComponentContent,
    updateComponentName,
    updateComponentSize,
    updateComponentColor,
    updateComponentMandatory,
    updateComponentRole,
    updateComponentRules,
    udpateComponentImformation,
    updateComponentPosition,
    addComponent,
    removeComponent,
    clearCanvas,
    selectComponent,
  };
};