import React from 'react';

export function ComponentActions({ onDelete }) {
  return (
    <div className="fixed bottom-4 right-4 w-56">
      <button
        onClick={onDelete}
        className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200 font-medium"
      >
        Deletar Componente
      </button>
    </div>
  );
}