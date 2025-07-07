export const dragHelpers = {
  calculateMovePosition(currentPosition, delta, canvasRect, elementWidth, elementHeight) {
    const newX = Math.max(
      0,
      Math.min(
        currentPosition.x + delta.x,
        canvasRect.width - elementWidth
      )
    );
    
    const newY = Math.max(
      0,
      Math.min(
        currentPosition.y + delta.y,
        canvasRect.height - elementHeight
      )
    );

    return { x: newX, y: newY };
  },
  createNewComponent(sourceComponent, position, idCounter) {
    return {
      ...sourceComponent,
      id: `${sourceComponent.type}-${idCounter}`,
      name: `${sourceComponent.type}-${idCounter}`,
      position,
    };
  },

};