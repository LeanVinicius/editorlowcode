// Funções utilitárias para manipulação de telas no editor
// Essas funções ajudam a gerenciar telas, como ordenação, criação, atualização e remoção

export const ScreenHelpers = {
 /**
   * Ordena um array de objetos de tela pelo ID da tela (`tela`).
   * Retorna um novo array ordenado, sem modificar o original.
   * @param {Array<object>} screens - O array de objetos de tela a ser ordenado.
   * @returns {Array<object>} Um novo array contendo os objetos de tela ordenados.
   */
  sortScreens(screens) {
    return [...screens].sort((a, b) => a.tela - b.tela);
  },

 /**
   * Calcula o próximo ID disponível para uma nova tela com base nos IDs existentes.
   * @param {Array<object>} screens - O array atual de objetos de tela.
   * @returns {number} O próximo ID de tela disponível.
   */
  getNextScreenId(screens) {
    return screens.length > 0
      ? Math.max(...screens.map((screen) => screen.tela)) + 1
      : 1;
  },

 /**
   * Atualiza propriedades de uma tela específica dentro de um array.
   * Retorna um novo array com a tela atualizada, sem modificar o original.
   * @param {Array<object>} screens - O array de objetos de tela.
   * @param {number} screenId - O ID da tela a ser atualizada.
   * @param {object} updates - Um objeto contendo as propriedades a serem atualizadas na tela.
   * @returns {Array<object>} Um novo array contendo os objetos de tela com a tela especificada atualizada.
   */
  updateScreenInList(screens, screenId, updates) {
    return screens.map((screen) =>
      screen.tela === screenId ? { ...screen, ...updates } : screen
    );
  },

 /**
   * Remove uma tela específica de um array de telas.
   * Retorna um novo array sem a tela removida, sem modificar o original.
   * @param {Array<object>} screens - O array de objetos de tela.
   * @param {number} screenId - O ID da tela a ser removida.
   * @returns {Array<object>} Um novo array contendo os objetos de tela, excluindo a tela especificada.
   */
  removeScreenFromList(screens, screenId) {
    return screens.filter((screen) => screen.tela !== screenId);
  },

 /**
   * Encontra uma tela específica dentro de um array pelo seu ID.
   * @param {Array<object>} screens - O array de objetos de tela.
   * @param {number} screenId - O ID da tela a ser encontrada.
   * @returns {object | undefined} O objeto de tela encontrado, ou `undefined` se não for encontrado.
   */
  findScreen(screens, screenId) {
    return screens.find((screen) => screen.tela === screenId);
  },

/**
  * Cria um novo objeto de tela com um ID e nome.
  * @param {number} screenId - O ID da nova tela.
  * @param {string} [name=null] - O nome opcional da nova tela. Se null, um nome padrão será gerado.
  * @returns {object} Um novo objeto representando a tela criada.
  */
  createScreen(screenId, name = null) {
    return {
      tela: screenId,
      nomeTela: name || `Tela ${screenId}`,
    };
  },

  
};