import React from 'react';

export function ComponentProperties({ component, onClose}) {
    if (!component) {
        return null;
    }
    else{
  return (
    <div>
      <h2>Propriedades do Componente</h2>
      <p>Nome: {component.content}</p>
      <p>Tipo: </p>
      <p>Posição: </p>
      <p>Tamanho: {component.size} </p>
      {/* Adicione outras propriedades conforme necessário */}
    </div>
  );
}
}
