"use client";
// TODO: colocar a url do xano

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function UserCanvasLoader({ onDataLoaded }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!userId) return;

    // Exemplo de chamada para seu backend
    fetch(`/api/get-user-canvas?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        onDataLoaded(data.canvas || []); // você adapta isso ao seu backend
      })
      .catch(err => {
        console.error("Erro ao carregar canvas:", err);
      });
  }, [userId]);

  return null; // não renderiza nada, apenas faz a chamada
}
