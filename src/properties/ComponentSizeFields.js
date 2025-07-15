import React from 'react';

export function ComponentSizeFields({ width, height, onSizeChange }) {
  return (
    <div className='flex flex-col space-y-5'>
      <div className="flex flex-col space-y-3">
        <label className="font-semibold text-[rgba(18,49,50,0.5)]">Largura (px)</label>
        <input
          type="number"
          value={width}
          onChange={(e) => onSizeChange('width', e.target.value)}
          className="w-full px-3 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
          min="50"
          placeholder="Largura em pixels"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="font-semibold text-[rgba(18,49,50,0.5)]">Altura (px)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => onSizeChange('height', e.target.value)}
          className="w-full px-3 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
          min="30"
          placeholder="Altura em pixels"
        />
      </div>
    </div>
  );
}