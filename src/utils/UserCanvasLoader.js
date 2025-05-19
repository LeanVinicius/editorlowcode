"use client";
// TODO: colocar a url do xano

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function UserCanvasLoader({ onDataLoaded }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const projectId = searchParams.get("projectId");

  useEffect(() => {
    if (!userId) return;

    // Exemplo de chamada para seu backend
    fetch(`https://xjvf-6soq-uwxw.n7c.xano.io/api:X-N9-OyD/desenho?usuario_id=${userId}&projeto_id=${projectId}&tela=1`)
      .then(res => res.json())
      .then(dataString => {
        if (!dataString || dataString === "null" || dataString === "[]") {onDataLoaded([]);return;}
        onDataLoaded(dataString); // você adapta isso ao seu backend
      })
      .catch(err => {
        console.error("Erro ao carregar canvas:", err);
      });
  }, [userId,onDataLoaded]);

  return null; // não renderiza nada, apenas faz a chamada
}
