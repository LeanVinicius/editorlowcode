import { useState, useCallback } from 'react';
import { ComponentHelpers } from '../utils/ComponentHelpers';

export const useCanvasState = () => {
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentIdCounter, setComponentIdCounter] = useState(1);

  const updateComponentContent = useCallback((componentId, newContent) => {
    setCanvasComponents(prevComponents => 
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'content', newContent)
    );
  }, []);

  const updateComponentName = useCallback((componentId, newName) => {
    setCanvasComponents(prevComponents => 
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'name', newName)
    );
  }, []);

  const updateComponentSize = useCallback((componentId, newSize) => {
    setCanvasComponents(prevComponents => 
      ComponentHelpers.updateComponentSize(prevComponents, componentId, newSize)
    );
  }, []);

  const updateComponentColor = useCallback((componentId, newColor) => {
    setCanvasComponents(prevComponents => 
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'colorComponent', newColor)
    );
  }, []);

  const updateComponentMandatory = useCallback((componentId, value) => {
    setCanvasComponents(prevComponents => 
      ComponentHelpers.updateComponentProperty(prevComponents, componentId, 'mandatory', value)
    );
  }, []);

  const updateComponentPosition = useCallback((componentId, newPosition) => {
    setCanvasComponents(prevComponents => 
      ComponentHelpers.updateComponentPosition(prevComponents, componentId, newPosition)
    );
  }, []);

  const addComponent = useCallback((component) => {
    setCanvasComponents(prevComponents => [...prevComponents, component]);
    setComponentIdCounter(prevCounter => prevCounter + 1);
  }, []);

  const removeComponent = useCallback((componentId) => {
    setCanvasComponents(prevComponents => 
      ComponentHelpers.removeComponent(prevComponents, componentId)
    );
    
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }
  }, [selectedComponent]);

  const clearCanvas = useCallback(() => {
    setCanvasComponents([]);
    setSelectedComponent(null);
  }, []);

  const selectComponent = useCallback((component) => {
    setSelectedComponent(component);
  }, []);

  return {
    canvasComponents,
    selectedComponent,
    componentIdCounter,
    setCanvasComponents,
    updateComponentContent,
    updateComponentName,
    updateComponentSize,
    updateComponentColor,
    updateComponentMandatory,
    updateComponentPosition,
    addComponent,
    removeComponent,
    clearCanvas,
    selectComponent,
  };
};