"use client";


import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function UserCanvasLoader({ onDataLoaded, shouldLoad, screens, selectScreen }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const projectId = searchParams.get("projectId");

  useEffect(() => {
    if (!userId || !shouldLoad || !projectId) return null;

    // Exemplo de chamada para seu backend
    fetch(
      `https://xjvf-6soq-uwxw.n7c.xano.io/api:X-N9-OyD/desenho?usuario_id=${userId}&projeto_id=${projectId}&tela=1`
    )
      .then((res) => res.json())
      .then((dataString) => {
        if (!dataString || dataString === "null" || dataString === "[]") {
          onDataLoaded([]);
          return;
        }
        onDataLoaded(dataString); // você adapta isso ao seu backend
      })
      .catch((err) => {
        console.error("Erro ao carregar canvas:", err);
      });
    fetch(
      `https://xjvf-6soq-uwxw.n7c.xano.io/api:X-N9-OyD/desenho/telas?usuario_id=${userId}&projeto_id=${projectId}`
    )
      .then((res) => res.json())
      .then((screenData) => {
        if (screens && typeof screens === "function") {
          screens(screenData);
        }
        if (Array.isArray(screenData) && screenData.length > 0 && typeof selectScreen === "function") {
      selectScreen(screenData[0].tela);
    }
      })
      .catch((err) => {
        console.error("Erro ao carregar telas:", err);
      });
      // pegar o primeiro elemento da lista
    

  }, [userId, onDataLoaded, shouldLoad, projectId,screens,selectScreen]);

  return null; // não renderiza nada, apenas faz a chamada
}
