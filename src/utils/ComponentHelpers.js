export const ComponentHelpers = {
 /**
   * Atualiza uma propriedade específica de um componente em um array de componentes.
   * @param {Array<object>} components - O array de componentes.
   * @param {string} componentId - O ID do componente a ser atualizado.
   * @param {string} property - O nome da propriedade a ser atualizada.
   * @param {*} value - O novo valor para a propriedade.
   * @returns {Array<object>} Um novo array de componentes com a propriedade atualizada.
   */
  updateComponentProperty(components, componentId, property, value) {
    return components.map((component) =>
      component.id === componentId
        ? { ...component, [property]: value }
        : component
    );
  },

 /**
   * Atualiza o tamanho (width e height) de um componente em um array de componentes.
   * @param {Array<object>} components - O array de componentes.
   * @param {string} componentId - O ID do componente a ser atualizado.
   * @param {object} newSize - O novo objeto de tamanho ({ width, height }).
   * @returns {Array<object>} Um novo array de componentes com o tamanho atualizado.
   */
  updateComponentSize(components, componentId, newSize) {
    return components.map((component) =>
      component.id === componentId
        ? { ...component, width: newSize.width, height: newSize.height }
        : component
    );
  },

 /**
   * Atualiza a posição (x e y) de um componente em um array de componentes.
   * @param {Array<object>} components - O array de componentes.
   * @param {string} componentId - O ID do componente a ser atualizado.
   * @param {object} newPosition - O novo objeto de posição ({ x, y }).
   * @returns {Array<object>} Um novo array de componentes com a posição atualizada.
   */
  updateComponentPosition(components, componentId, newPosition) {
    return components.map((component) =>
      component.id === componentId
        ? { ...component, position: newPosition }
        : component
    );
  },

 /**
   * Remove um componente de um array de componentes.
   * @param {Array<object>} components - O array de componentes.
   * @param {string} componentId - O ID do componente a ser removido.
   * @returns {Array<object>} Um novo array de componentes sem o componente especificado.
   */
  removeComponent(components, componentId) {
    return components.filter((component) => component.id !== componentId);
  },

 /**
   * Encontra um componente em um array pelo seu ID.
   * @param {Array<object>} components - O array de componentes.
   * @param {string} componentId - O ID do componente a ser encontrado.
   + @returns {object | undefined} O objeto componente se encontrado, caso contrário undefined.
   */
  findComponent(components, componentId) {
    return components.find((component) => component.id === componentId);
  },
};