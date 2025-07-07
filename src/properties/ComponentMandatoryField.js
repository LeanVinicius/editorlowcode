import React from 'react';
import { MANDATORY_OPTIONS } from '@/constants/Components';

export function ComponentMandatoryField({ mandatory, onMandatoryChange }) {
  const mandatoryOptions = [
    { value: MANDATORY_OPTIONS.REQUIRED, label: 'Obrigatório' },
    { value: MANDATORY_OPTIONS.OPTIONAL, label: 'Opcional' }
  ];

  return (
    <div className="mt-4">
      <label className="block mb-2 text-white">Obrigatoriedade:</label>
      <div className="space-y-2">
        {mandatoryOptions.map(option => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name="obrigatoriedade"
              value={option.value}
              className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
              onChange={(e) => onMandatoryChange(e.target.value)}
              checked={mandatory === option.value}
            />
            <span className="text-white">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}