import { useState } from 'react';

export function JsonStringParser({ onParseJson }) {
  const [jsonString, setJsonString] = useState('');

  const handleParse = () => {
    try {
      const jsonData = JSON.parse(jsonString);
      onParseJson(jsonData);
      setJsonString(''); // Clear after successful parse
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <textarea
        value={jsonString}
        onChange={(e) => setJsonString(e.target.value)}
        className="w-full h-32 p-2 border rounded mb-2 font-mono text-sm text-black"
        placeholder="Paste your JSON here..."
      />
      <button
        onClick={handleParse}
        className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
      >
        Parse JSON
      </button>
    </div>
  );
}
