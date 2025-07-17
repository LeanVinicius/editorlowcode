import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

export function ComponentOptionsField({ options, onOptionsChange }) {
  
  const [newOption, setNewOption] = React.useState('');

  const handleAddOption = () => {
    if (newOption.trim() === '') return;
    const lastId = options.length > 0 ? Math.max(...options.map(o => o.id)) : 0;
    const newEntry = {
      id: lastId + 1,
      Opcao: newOption.trim(),
    };
    const updated = [...options, newEntry];
    onOptionsChange(updated);
    setNewOption('');
  };

  const handleEditOption = (id, newValue) => {
    const updated = options.map(o => o.id === id ? { ...o, Opcao: newValue } : o);
    onOptionsChange(updated);
  };



  return (
    <div className='flex flex-col space-y-3'>
      <label className='font-semibold text-[rgba(18,49,50,0.5)]'>Opções</label>
      <div className='space-y-2 overflow-y-auto'>
        {options.map((opt) => (
          <input
          key={opt.id}
          type="text"
          value={opt.Opcao}
          onChange={(e) => handleEditOption(opt.id,e.target.value)}
          className="w-full px-3 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
          placeholder="Digite a opção"
        />
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          className="w-full px-3 py-1 bg-white font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
          placeholder="Digite a opção"
        />
        <button className='h-9 leading-none cursor-pointer text-[16px] font-semibold bg-[rgba(18,49,50,1)] hover:bg-[rgba(28,66,67,1)]
                             text-white px-3 py-1 rounded-3xl'
          onClick={handleAddOption}
        >
          Adicionar
        </button>
      </div>
    </div>


  );

}