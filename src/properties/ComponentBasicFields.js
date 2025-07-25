import React from 'react';

export function ComponentBasicFields({
  name,
  content,
  onNameChange,
  onContentChange
}) {
  return (
    <div className='flex flex-col space-y-5'>
      <div className="flex flex-col space-y-3">
        <label className="font-semibold text-[rgba(18,49,50,0.5)]">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full px-3 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
          placeholder="Digite o nome do componente"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="font-semibold text-[rgba(18,49,50,0.5)]">Texto</label>
        <input
          type="text"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full px-3 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
          placeholder="Digite o texto do componente"
        />
      </div>

    </div>
  );
}