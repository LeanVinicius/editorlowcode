import React from 'react';

export function ComponentColorField({ color, onColorChange }) {
  return (
    <div className="flex flex-col space-y-3">
      <label className="font-semibold text-[rgba(18,49,50,0.5)]">Cor:</label>
      <div className="flex gap-2">
      <input
          type="text"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-38 px-3 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
          placeholder="#000000 ou rgb(0,0,0)"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-10 h-10 cursor-pointer border rounded-[5px]"
          title="Seletor de cor"
        />
      </div>
    </div>
  );
}