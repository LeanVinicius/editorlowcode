import React from 'react';
import Chance from 'chance';

export function ComponentTableFields({ data, onDataChange, name, onNameChange }) {
    const newChance = new Chance();

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    const handleAddData = () => {
        const lastId = data.length > 0 ? Math.max(...data.map(d => d.id)) : 0;
        const newData = { id: lastId + 1 };

        headers.forEach((header) => {
            if (header !== "id") {
                newData[header] = randomizeData(header);
            }
        });

        const updated = [...data, newData];
        onDataChange(updated);
    }

    function randomizeData(header) {
        // NOTE : adicionar aqui novos tipos de dados aleatórios

        if (header.toLowerCase().includes("nome")) {
            return newChance.name();
        }
        if (header.toLowerCase().includes("idade")) {
            return Math.floor(Math.random() * 60) + 18;
        }
        if (header.toLowerCase().includes("cidade")) {
            return newChance.city();
        }
        if (header.toLowerCase().includes("email")) {
            return newChance.email({ domain: 'gmail.com' });
        }
        if (header.toLowerCase().includes("ano")) {
            return Math.floor(Math.random() * 10) + 2000;
        }
        if (header.toLowerCase().includes("status")) {
            const status = ["Enviado", "Não enviado"];
            return status[Math.floor(Math.random() * status.length)];
        }

        // Valor genérico se não souber o que é
        return `${Math.floor(Math.random() * 1000)}`;

    }

    const handleDeleteData = () => {
        const lastId = data.length > 0 ? Math.max(...data.map(d => d.id)) : 0;
        const updated = data.filter(d => d.id !== lastId);
        onDataChange(updated);
    }

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
            <div className='flex flex-col space-y-3'>
                <label className='font-semibold text-[rgba(18,49,50,0.5)]'>Dados</label>
                <div className='flex flex-col justify-center space-y-2'>

                    <button className='h-9 leading-none cursor-pointer text-[16px] font-semibold bg-[rgba(18,49,50,1)] hover:bg-[rgba(28,66,67,1)]
                               text-white px-3 py-1 rounded-3xl'
                        onClick={handleAddData}
                    >
                        Adicionar dado aleatório
                    </button>
                    <button className='h-9 leading-none cursor-pointer text-[16px] font-semibold bg-red-600 hover:bg-red-500
                               text-white px-3 py-1 rounded-3xl'
                        onClick={handleDeleteData}
                    >
                        Deletar último dado
                    </button>
                </div>
            </div>
        </div>
    );
}