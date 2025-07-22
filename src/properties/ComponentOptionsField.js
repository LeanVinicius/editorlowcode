import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

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

  const handleDeleteOption = (id) => {
    const confirm = window.confirm("Tem certeza que deseja excluir esta opção?");
    if (!confirm) return;

    const updated = options.filter(o => o.id !== id);
    onOptionsChange(updated);
  };



  return (
    <div className='flex flex-col space-y-3'>
      <label className='font-semibold text-[rgba(18,49,50,0.5)]'>Opções</label>
      <div className='space-y-2 overflow-y-auto'>
        {options.map((opt) => (
          <div key={opt.id} className='flex justify-between w-full pl-3 pr-1 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]'>
            <input
              type="text"
              value={opt.Opcao}
              onChange={(e) => handleEditOption(opt.id, e.target.value)}
              className=""
              placeholder="Edite a opção"
            />
            <X className='h-[15px] w-[15px] text-[rgba(18,49,50,1)] hover:text-[#6aaeb1] self-start'
              onClick={() => handleDeleteOption(opt.id)}
            ></X>
          </div>
        ))}
      </div>
      <div className='flex flex-col justify-center space-y-2'>
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