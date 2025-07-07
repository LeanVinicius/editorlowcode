import React from 'react';

export function ComponentColorField({ color, onColorChange }) {
  return (
    <div className="mt-4">
      <label className="block mb-2 text-white">Cor:</label>
      <div className="flex gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-8 h-8 cursor-pointer rounded-none"
          title="Seletor de cor"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded"
          placeholder="#000000 ou rgb(0,0,0)"
        />
      </div>
    </div>
  );
}