// Carregamento inicial do canvas
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CanvasApi } from "@/services/CanvasApi";

export function UserCanvasLoader({
  onDataLoaded,
  shouldLoad,
  screens,
  selectScreen,
}) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const projectId = searchParams.get("projectId");

  useEffect(() => {
    if (!userId || !shouldLoad || !projectId) return null;

    CanvasApi.loadScreens(userId, projectId)
      .then((screenData) => {
        if (screens && typeof screens === "function") {
          screens(screenData);
        }
        if (Array.isArray(screenData) && screenData.length > 0) {
          const firstScreen = screenData[0].tela;
          if (typeof selectScreen === "function") {
            selectScreen(screenData[0].tela);
          }
          CanvasApi.loadCanvas(userId, projectId, firstScreen)
            .then(onDataLoaded)
            .catch((err) => {
              console.error("Erro ao carregar componentes do canvas:", err);
              onDataLoaded([]); // em caso de erro, retorna um array vazio
            });
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar telas:", err);
      });
  }, [userId, onDataLoaded, shouldLoad, projectId, screens, selectScreen]);

  return null; // não renderiza nada, apenas faz a chamada
}
