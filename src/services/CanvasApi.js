const API_BASE_URL = "https://xjvf-6soq-uwxw.n7c.xano.io/api:X-N9-OyD";

export const CanvasApi = {
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
