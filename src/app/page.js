import { Suspense } from "react";

import Home from "./home";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando aplicação...</div>}>
      <Home/>
    </Suspense>
  );
}