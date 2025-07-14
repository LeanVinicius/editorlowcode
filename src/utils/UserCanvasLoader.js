// Carregamento inicial do canvas
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { CanvasApi } from "@/services/CanvasApi";

/**
  * @param {object} props - As propriedades do componente.
  * @param {(data: any[]) => void} props.onDataLoaded - Função chamada com os dados dos componentes do canvas após o carregamento.
  * @param {boolean} props.shouldLoad - Booleano que determina se o carregamento deve ser executado.
  * @param {(data: any[]) => void} props.screens - Função chamada com os dados das telas disponíveis após o carregamento.
  * @param {(screenId: string) => void} props.selectScreen - Função chamada com o ID da primeira tela carregada para selecioná-la.
  * @returns {null} Este componente não renderiza nada visualmente, apenas executa a lógica de carregamento.
  * @description Este componente é responsável por carregar os dados iniciais das telas e dos componentes do canvas a partir da API ao ser montado. Ele utiliza hooks do Next.js e React para obter parâmetros da URL e gerenciar o ciclo de vida do carregamento.
  */
export function UserCanvasLoader({
  onDataLoaded,
  shouldLoad,
  screens,
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
          
          CanvasApi.loadCanvas(userId, projectId, firstScreen)
            .then(onDataLoaded)
            .catch((err) => {
              console.error("Erro ao carregar componentes do canvas:", err);
              onDataLoaded([]);
            });
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar telas:", err);
      });
  }, [userId, onDataLoaded, shouldLoad, projectId, screens, ]);

  return null;
}
