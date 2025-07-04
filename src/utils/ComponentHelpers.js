export const ComponentHelpers = {
  updateComponentProperty(components, componentId, property, value) {
    return components.map((component) =>
      component.id === componentId
        ? { ...component, [property]: value }
        : component
    );
  },

  updateComponentSize(components, componentId, newSize) {
    return components.map((component) =>
      component.id === componentId
        ? { ...component, width: newSize.width, height: newSize.height }
        : component
    );
  },

  updateComponentPosition(components, componentId, newPosition) {
    return components.map((component) =>
      component.id === componentId
        ? { ...component, position: newPosition }
        : component
    );
  },

  removeComponent(components, componentId) {
    return components.filter((component) => component.id !== componentId);
  },

  findComponent(components, componentId) {
    return components.find((component) => component.id === componentId);
  },
};