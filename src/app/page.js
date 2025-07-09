/**
 * Este é o ponto de entrada principal da aplicação.
 * Responsável por renderizar o componente CanvasDesigner e gerenciar o estado de carregamento inicial.
 */
import { Suspense } from "react";

import CanvasDesigner from "@/components/CanvasDesigner";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando aplicação...</div>}>
      <CanvasDesigner/>
    </Suspense>
  );
}