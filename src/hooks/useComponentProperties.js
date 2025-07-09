import { useState, useEffect } from 'react';

export const useComponentProperties = (component) => {
  const [formData, setFormData] = useState({
    width: 0,
    height: 80,
    content: '',
    color: '#ffffff',
    name: '',
    mandatory: 'opcional',
    multi: false,
    options: [],
    role: ''
  });
  
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    if (component) {
      setFormData({
        width: component.width || 0,
        height: component.height || 80,
        content: component.content || '',
        color: component.colorComponent || '#ffffff',
        name: component.name || '',
        mandatory: component.mandatory || 'opcional',
        multi: component.multi || false,
        options: component.options || [],
        role: component.role || ''
      });
    }
  }, [component]);

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    formData,
    updateField,
    isEditingName,
    setIsEditingName
  };
};