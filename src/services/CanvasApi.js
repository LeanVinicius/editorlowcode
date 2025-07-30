const API_BASE_URL = "https://xjvf-6soq-uwxw.n7c.xano.io/api:X8fAX8_g";


export const CanvasApi = {
  /**
    * Carrega os dados do canvas para um usuário, projeto e tela específicos.
    * @param {string} userId - O ID do usuário.
    * @param {string} projectId - O ID do projeto.
    * @param {string} screenId - O ID da tela a ser carregada.
    */
  async loadCanvas(userId, projectId, screenId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/desenho?usuario_id=${userId}&projeto_id=${projectId}&tela=${screenId}`
      );
      const data = await response.json();

      if (!data || data === "null" || data === "[]") {
        return [];
      }

      const parsedComponents =
        typeof data === "string" ? JSON.parse(data) : data;
      return parsedComponents.map((component, index) => ({
        ...component,
        id: `${component.type}-${Date.now()}-${index}`,
      }));
    } catch (error) {
      console.error("Erro ao carregar canvas:", error);
      throw new Error("Falha ao carregar canvas");
    }
  },

  /**
    * Salva os dados atuais do canvas para um usuário, projeto e tela específicos.
    * @param {string} userId - O ID do usuário.
    * @param {string} projectId - O ID do projeto.
    * @param {string} screenId - O ID da tela onde o canvas será salvo.
    * @param {string} canvasData - Os dados do canvas em formato string (geralmente JSON stringificado).
    */
  async saveCanvas(userId, projectId, screenId, canvasData) {
    try {
      const response = await fetch(`${API_BASE_URL}/desenho`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: userId,
          projeto_id: projectId,
          tela: screenId,
          desenho: canvasData,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao salvar canvas:", error);
      throw new Error("Falha ao salvar canvas");
    }
  },

  /**
    * Carrega a lista de telas disponíveis para um usuário e projeto específicos.
    * @param {string} userId - O ID do usuário.
    * @param {string} projectId - O ID do projeto.
    */
  async loadScreens(userId, projectId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/desenho/telas?usuario_id=${userId}&projeto_id=${projectId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao carregar telas:", error);
      throw new Error("Falha ao carregar telas");
    }
  },

  /**
    * Cria uma nova tela para um usuário e projeto específicos.
    * @param {string} userId - O ID do usuário.
    * @param {string} projectId - O ID do projeto.
    * @param {string} screenId - O ID da nova tela a ser criada.
    */
  async createScreen(userId, projectId, screenId) {
    try {
      const response = await fetch(`${API_BASE_URL}/desenho`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: userId,
          projeto_id: projectId,
          tela: screenId,
          desenho: JSON.stringify([]),
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao criar tela:", error);
      throw new Error("Falha ao criar nova tela");
    }
  },

  /**
    * Atualiza o nome de uma tela existente para um usuário e projeto específicos.
    * @param {string} userId - O ID do usuário.
    * @param {string} projectId - O ID do projeto.
    * @param {string} screenId - O ID da tela a ser renomeada.
    * @param {string} newName - O novo nome para a tela.
    */
  async updateScreenName(userId, projectId, screenId, newName) {
    try {
      const response = await fetch(`${API_BASE_URL}/desenho/alterarNome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: userId,
          projeto_id: projectId,
          tela: screenId,
          nomeTela: newName,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao renomear tela:", error);
      throw new Error("Falha ao renomear tela");
    }
  },

  /**
    * Exclui uma tela existente para um usuário e projeto específicos.
    * @param {string} userId - O ID do usuário.
    * @param {string} projectId - O ID do projeto.
    * @param {string} screenId - O ID da tela a ser excluída.
    */
  async deleteScreen(userId, projectId, screenId) {
    try {
      const response = await fetch(`${API_BASE_URL}/desenho`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: userId,
          projeto_id: projectId,
          tela: screenId,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao deletar a tela:", error);
      throw new Error("Falha ao deletar tela");
    }
  },
};
