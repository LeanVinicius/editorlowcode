import React, { useEffect, useState } from 'react';

export function ComponentProperties({ component, onUpdateSize, onUpdateContent, onUpdateColor }) {
    const [localWidth, setLocalWidth] = useState(component?.width || 0);
    const [localHeight, setLocalHeight] = useState(component?.height || 80);
    const [localContent, setLocalContent] = useState(component?.content || '');
    const [localColor, setLocalColor] = useState(component?.colorComponent || '#ffffff');

    // Atualiza os inputs sempre que um novo componente for selecionado
    useEffect(() => {
        setLocalWidth(component?.width || 0);
        setLocalHeight(component?.height || 80);
        setLocalContent(component?.content || '');
        setLocalColor(component?.colorComponent || '#ffffff');
    }, [component]);

    if (!component) {
        return null;
    }

    return (
        <div className="w-64 bg-amber-800 p-4 rounded-lg overflow-auto h-screen fixed right-0">
            <h2 className="text-lg font-semibold mb-4">Propriedades do Componente</h2>
            <p>Tipo: {component.type}</p>

            <div className="mt-4">
                <label className="block mb-2">Texto:</label>
                <input 
                    type="text"
                    value={localContent}
                    onChange={(e) => {
                        setLocalContent(e.target.value);
                        onUpdateContent(component.id, e.target.value);
                    }}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            
            <div className="mt-4">
                <label className="block mb-2">Largura (px):</label>
                <input 
                    type="number"
                    value={localWidth}
                    onChange={(e) => {
                        const newWidth = parseInt(e.target.value);
                        setLocalWidth(newWidth);
                        onUpdateSize(component.id, {
                            width: newWidth,
                            height: localHeight
                        });
                    }}
                    className="w-full px-3 py-2 border rounded"
                    min="50"
                />
            </div>

            <div className="mt-4">
                <label className="block mb-2">Altura (px):</label>
                <input 
                    type="number"
                    value={localHeight}
                    onChange={(e) => {
                        const newHeight = parseInt(e.target.value);
                        setLocalHeight(newHeight);
                        onUpdateSize(component.id, {
                            width: localWidth,
                            height: newHeight
                        });
                    }}
                    className="w-full px-3 py-2 border rounded"
                    min="30"
                />
            </div>
            <div className="mt-4">
                <label className="block mb-2">Cor:</label>
                <div className="flex gap-2">
                    <input 
                        type="color"
                        value= {localColor}
                        onChange={(e) => {
                            setLocalColor(e.target.value);
                            onUpdateColor(component.id, e.target.value);
                        }}
                        className="w-12 h-8 cursor-pointer"
                    />
                    <input 
                        type="text"
                        value= {localColor}
                        onChange={(e) => {
                            setLocalColor(e.target.value);
                            onUpdateColor(component.id, e.target.value);
                        }}
                        className="w-full px-3 border rounded"
                        placeholder="#000000 ou rgb(0,0,0)"
                    />
                </div>
            </div>
            <div className="mt-4">
                teste
                </div>
        </div>
    );
}
