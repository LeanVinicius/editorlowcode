import React from 'react';
import { Plus } from 'lucide-react';

export function ComponentOptionsField({ options, onOptionsChange }) {
  const [showModal, setShowModal] = React.useState(false);
  const [localOptions, setLocalOptions] = React.useState([]);
  const [newOption, setNewOption] = React.useState('');

  const handleAddOption = () => {
    if (newOption.trim() === '') return;

    setLocalOptions((prev) => [...prev, newOption.trim()]);
    setNewOption('');
  };

  return (
    <>
      <div className='flex flex-col space-y-3'>
        <label className='font-semibold text-[rgba(18,49,50,0.5)]'>Opções</label>
        <div className='space-y-2 overflow-y-auto'>
          {options.map((opt) => (
            <div key={opt}>{opt}</div>
          ))}
        </div>
        <button
          onClick={() => setShowModal(true)}
        >Adicionar</button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[rgba(254,254,254,1)] space-y-3 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-lg w-96 relative">
            <button
              onClick={() => {setShowModal(false);setLocalOptions([])}}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
              aria-label="Fechar"
            >
              &times;
            </button>
            <h2 className="text-[20px] font-bold text-[rgba(18,49,50,1)] mb-4">Adicionar Opções</h2>
            <div className='flex gap-2' >
              <input
                type="text"
                onChange={(e) => setNewOption(e.target.value)}
                className="w-full px-3 py-1 bg-white font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
                placeholder="Digite a opção"
              />
              <div className='flex flex-col bg-white p-1 rounded-xl shadow-md cursor-pointer'>
                <Plus className='text-[rgba(18,49,50,1)]'
                  onClick={handleAddOption}></Plus>
              </div>
            </div>
            <div className='flex flex-wrap w-full h-full overflow-y-auto border border-[rgba(18,49,50,0.5)] gap-2'>
              {localOptions.map((opt) => (
                <p className='hover:bg-gray-200 p-2 cursor-pointer rounded text-[rgba(18,49,50,1)]'
                  key={opt}
                >
                  {opt}
                </p>
              ))}
            </div>
            <div className='flex flex-row justify-between'>
              <button className='bg-white rounded-xl shadow-md cursor-pointer p-3 text-[rgba(18,49,50,1)]'>Apagar</button>
              <button className='bg-white rounded-xl shadow-md cursor-pointer p-3 text-[rgba(18,49,50,1)]'>Editar</button>
            </div>
            <div className='flex flex-row justify-between'>
              <button className='bg-white rounded-xl shadow-md cursor-pointer p-3 text-[rgba(18,49,50,1)]'>Apagar tudo</button>
              <button className='bg-white rounded-xl shadow-md cursor-pointer p-3 text-[rgba(18,49,50,1)]'>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );

}