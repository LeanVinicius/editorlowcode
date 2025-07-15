import React from 'react';

export function ComponentActions({ onDelete }) {
  return (
    <div className="w-56 flex justify-center mb-2 mt-5">
      <button
        onClick={onDelete}
        className="h-9 w-52 leading-none cursor-pointer text-[16px] font-semibold bg-red-600 hover:bg-red-500
                    text-white px-3 py-1 rounded-3xl"
      >
        Deletar Componente
      </button>
    </div>
  );
}