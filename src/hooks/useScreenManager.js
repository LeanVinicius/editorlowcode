import { useState, useCallback } from "react";
import { ScreenHelpers } from "../utils/ScreenHelpers";
import { CanvasApi } from "../services/CanvasApi";

export const useScreenManager = (userId, projectId) => {
  const [availableScreens, setAvailableScreens] = useState([]);
  const [currentScreenId, setCurrentScreenId] = useState(null);
  const [currentScreenName, setCurrentScreenName] = useState("");
  const [isEditingScreenName, setIsEditingScreenName] = useState(false);
  const [temporaryScreenName, setTemporaryScreenName] = useState("");

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
