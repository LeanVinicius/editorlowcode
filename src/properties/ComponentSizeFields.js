import React from 'react';

export function ComponentSizeFields({ width, height, onSizeChange }) {
  return (
    <>
      <div className="mt-4">
        <label className="block mb-2 text-white">Largura (px):</label>
        <input
          type="number"
          value={width}
          onChange={(e) => onSizeChange('width', e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="50"
          placeholder="Largura em pixels"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2 text-white">Altura (px):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => onSizeChange('height', e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="30"
          placeholder="Altura em pixels"
        />
      </div>
    </>
  );
}