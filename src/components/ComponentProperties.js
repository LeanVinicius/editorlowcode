import React from 'react';

export function ComponentProperties({ component, onUpdateSize }) {
    if (!component) {
        return null;
    }

    return (
        <div className="w-64 bg-green p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Propriedades do Componente</h2>
            <p>Nome: {component.content}</p>
            <p>Tipo: {component.type}</p>
            
            <div className="mt-4">
                <label className="block mb-2">Largura (px):</label>
                <input 
                    type="number"
                    value={component.width || 0}
                    onChange={(e) => onUpdateSize(component.id, {
                        width: parseInt(e.target.value),
                        height: component.height
                    })}
                    className="w-full px-3 py-2 border rounded"
                    min="50"
                />
            </div>

            <div className="mt-4">
                <label className="block mb-2">Altura (px):</label>
                <input 
                    type="number"
                    value={component.height || 80}
                    onChange={(e) => onUpdateSize(component.id, {
                        width: component.width,
                        height: parseInt(e.target.value)
                    })}
                    className="w-full px-3 py-2 border rounded"
                    min="30"
                />
            </div>
        </div>
    );
}