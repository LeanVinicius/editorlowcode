import React from 'react';

export function ComponentBasicFields({
  name,
  componentType,
  content,
  isEditingName,
  onNameClick,
  onNameChange,
  onNameEditComplete,
  onContentChange
}) {
  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleNameBlur = (e) => {
    const newName = e.target.textContent;
    onNameEditComplete();
    onNameChange(newName);
  };

  return (
    <>
      <div className="mt-4">
        <label className="block mb-2 text-white">Nome:</label>
        {isEditingName ? (
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className="block w-full px-3 py-2 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {name}
          </span>
        ) : (
          <div
            onClick={onNameClick}
            className="px-3 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors"
          >
            {name || 'Clique para editar'}
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="block mb-2 text-white">Tipo:</label>
        <div className="px-3 py-2 ">
          {componentType}
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-2 text-white">Texto:</label>
        <input
          type="text"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o texto do componente"
        />
      </div>
    </>
  );
}