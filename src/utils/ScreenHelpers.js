// Funções utilitárias para manipulação de telas no editor
// Essas funções ajudam a gerenciar telas, como ordenação, criação, atualização e remoção

export const ScreenHelpers = {
  sortScreens(screens) {
    return [...screens].sort((a, b) => a.tela - b.tela);
  },

  getNextScreenId(screens) {
    return screens.length > 0 
      ? Math.max(...screens.map((screen) => screen.tela)) + 1 
      : 1;
  },

  updateScreenInList(screens, screenId, updates) {
    return screens.map((screen) =>
      screen.tela === screenId ? { ...screen, ...updates } : screen
    );
  },

  removeScreenFromList(screens, screenId) {
    return screens.filter((screen) => screen.tela !== screenId);
  },

  findScreen(screens, screenId) {
    return screens.find((screen) => screen.tela === screenId);
  },

  createScreen(screenId, name = null) {
    return {
      tela: screenId,
      nomeTela: name || `Tela ${screenId}`,
    };
  },
};