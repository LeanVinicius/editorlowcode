import React, { useEffect, useState } from 'react';

export function ComponentProperties({ component, onUpdateSize, onUpdateContent, onUpdateColor, onDelete, onUpdateName }) {
    const [localWidth, setLocalWidth] = useState(component?.width || 0);
    const [localHeight, setLocalHeight] = useState(component?.height || 80);
    const [localContent, setLocalContent] = useState(component?.content || '');
    const [localColor, setLocalColor] = useState(component?.colorComponent || '#ffffff');
    const [localName, setLocalName] = useState(component?.name || '');
    const [isEditingId, setIsEditingId] = useState(false);

    // Atualiza os inputs sempre que um novo componente for selecionado
    useEffect(() => {
        setLocalWidth(component?.width || 0);
        setLocalHeight(component?.height || 80);
        setLocalContent(component?.content || '');
        setLocalColor(component?.colorComponent || '#ffffff');
        setLocalName(component?.name || '');
    }, [component]);
    


    if (!component) {
        return null;
    }

    return (
        <div className="w-64 bg-amber-800 p-4 rounded-lg z-30 overflow-auto h-screen fixed right-0">
            <div className='pb-16'>
                <h2 className="text-lg font-semibold mb-4">Propriedades do Componente</h2>
                <div className="mt-4">
                    <label className="block mb-2">Nome:</label>
                    {isEditingId ? (
                        <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                                const newName = e.target.textContent;
                                setIsEditingId(false);
                                setLocalName(newName);
                                onUpdateName(component.id, newName);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    e.target.blur();
                                }
                            }}
                            className="block w-full px-3 py-2 bg-white rounded focus:outline-none"
                        >
                            {localName}
                        </span>
                    ) : (
                        <div
                            onClick={() => setIsEditingId(true)}
                            className="px-3 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                        >
                            {localName}
                        </div>
                    )}
                </div>
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
                            value={localColor}
                            onChange={(e) => {
                                setLocalColor(e.target.value);
                                onUpdateColor(component.id, e.target.value);
                            }}
                            className="w-12 h-8 cursor-pointer"
                        />
                        <input
                            type="text"
                            value={localColor}
                            onChange={(e) => {
                                setLocalColor(e.target.value);
                                onUpdateColor(component.id, e.target.value);
                            }}
                            className="w-full px-3 border rounded"
                            placeholder="#000000 ou rgb(0,0,0)"
                        />
                    </div>
                </div>
                <div>text</div>
                <div>text</div>
                <div>text</div>
                <div>text</div>
            </div>
            <div className='fixed bottom-0 right-0 w-64 bg-amber-800'>
                <button
                    onClick={() => onDelete(component.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors" >
                    Deletar
                </button>
            </div>

        </div>
    );
}
