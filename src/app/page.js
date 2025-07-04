import { Suspense } from "react";

import CanvasDesigner from "@/components/CanvasDesigner";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando aplicação...</div>}>
      <CanvasDesigner/>
    </Suspense>
  );
}