import { useState, useCallback } from "react";
import { ScreenHelpers } from "../utils/ScreenHelpers";
import { CanvasApi } from "../services/CanvasApi";

/**
 * Hook customizado para gerenciar o estado e as operações relacionadas às telas (screens) do projeto.
 * Interage com `CanvasApi` para operações de backend e `ScreenHelpers` para manipulação de dados locais.
 *
 * @param {string} userId - O ID do usuário atual.
 * @param {string} projectId - O ID do projeto atual.
 * @returns {object} Um objeto contendo o estado e funções para gerenciar as telas.
 */
export const useScreenManager = (userId, projectId) => {
  const [availableScreens, setAvailableScreens] = useState([]);
  const [currentScreenId, setCurrentScreenId] = useState(null);
  const [currentScreenName, setCurrentScreenName] = useState("");
  const [isEditingScreenName, setIsEditingScreenName] = useState(false);
  const [temporaryScreenName, setTemporaryScreenName] = useState("");

/** 
  * Cria uma nova tela para o usuário e projetos atuais
  */
  const createNewScreen = useCallback(async () => {
    if (!userId || !projectId) return;

    try {
      const nextScreenId = ScreenHelpers.getNextScreenId(availableScreens);
      await CanvasApi.createScreen(userId, projectId, nextScreenId);

      const newScreen = ScreenHelpers.createScreen(nextScreenId);
      const updatedScreens = ScreenHelpers.sortScreens([
        ...availableScreens,
        newScreen,
      ]);

      setAvailableScreens(updatedScreens);
      setCurrentScreenId(nextScreenId);
      setCurrentScreenName("Tela " + nextScreenId);

      return nextScreenId;
    } catch (error) {
      console.error("Erro ao criar nova tela:", error);
      alert("Erro ao criar nova tela.");
    }
  }, [userId, projectId, availableScreens]);

/**
  * Atualiza o nome de uma tela específica.
  *
  * @param {string|number} screenId - O ID da tela a ser atualizada.
  * @param {string} newName - O novo nome para a tela.
  * @returns {Promise<void>}
  */
  const updateScreenName = useCallback(
    async (screenId, newName) => {
      try {
        await CanvasApi.updateScreenName(userId, projectId, screenId, newName);

        const updatedScreens = ScreenHelpers.updateScreenInList(
          availableScreens,
          screenId,
          { nomeTela: newName }
        );

        setAvailableScreens(updatedScreens);
        setIsEditingScreenName(false);
        setTemporaryScreenName("");
        setCurrentScreenName(newName);
      } catch (error) {
        console.error("Erro ao renomear a tela:", error);
        alert("Erro ao renomear a tela.");
      }
    },
    [userId, projectId, availableScreens]
  );

/**
  * Exclui uma tela específica.
  *
  * @param {string|number} screenId - O ID da tela a ser excluída.
  * @returns {Promise<void>}
  */
  const deleteScreen = useCallback(
    async (screenId, onSuccess, onError) => {
      try {
        const confirmed = window.confirm(
          "Tem certeza que deseja excluir esta tela?"
        );
        if (!confirmed) return;
        await CanvasApi.deleteScreen(
          userId,
          projectId,
          screenId,
        );
        const updatedScreens = ScreenHelpers.removeScreenFromList(
          availableScreens,
          screenId
        );
        setAvailableScreens(updatedScreens);

        if (currentScreenId === screenId) {
          setCurrentScreenId(updatedScreens[0]?.tela || null);
          setCurrentScreenName(updatedScreens[0]?.nomeTela || "");
        }

        onSuccess?.();
      } catch (error) {
        onError?.(error);
      }
    },
    [userId, projectId, availableScreens, currentScreenId]
  );

/**
  * Seleciona uma tela para ser a tela atual.
  *
  * @param {string|number} screenId - O ID da tela a ser selecionada.
  */
  const selectScreen = useCallback(
    (screenId) => {
      const selectedScreen = ScreenHelpers.findScreen(
        availableScreens,
        screenId
      );
      setCurrentScreenName(selectedScreen?.nomeTela || `Tela ${screenId}`);
      setCurrentScreenId(screenId);
    },
    [availableScreens]
  );

  return {
    availableScreens,
    currentScreenId,
    currentScreenName,
    isEditingScreenName,
    temporaryScreenName,
    setAvailableScreens,
    setCurrentScreenId,
    setCurrentScreenName,
    setIsEditingScreenName,
    setTemporaryScreenName,
    createNewScreen,
    updateScreenName,
    deleteScreen,
    selectScreen,
  };
};
