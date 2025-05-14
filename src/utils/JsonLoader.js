import { useState } from 'react';

export function JsonLoader({ onLoadJson }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        onLoadJson(jsonData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
}
