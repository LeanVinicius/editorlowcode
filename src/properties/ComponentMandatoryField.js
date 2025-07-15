import React from 'react';
import { MANDATORY_OPTIONS } from '@/constants/Components';

export function ComponentMandatoryField({ mandatory, onMandatoryChange }) {
  const mandatoryOptions = [
    { value: MANDATORY_OPTIONS.REQUIRED, label: 'Obrigatório' },
    { value: MANDATORY_OPTIONS.OPTIONAL, label: 'Opcional' }
  ];

  return (
    <div className="flex flex-col space-y-3">
      <label className="font-semibold text-[rgba(18,49,50,0.5)]">Obrigatoriedade:</label>
      <div className="space-y-2">
        {mandatoryOptions.map(option => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name="obrigatoriedade"
              value={option.value}
              className="form-radio h-4 w-4 accent-[rgba(18,49,50,1)] focus:ring-[rgba(18,49,50,0.5)]"
              onChange={(e) => onMandatoryChange(e.target.value)}
              checked={mandatory === option.value}
            />
            <span className="font-semibold text-[rgba(18,49,50,0.5)]">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}