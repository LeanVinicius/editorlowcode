export const dragHelpers = {
  /**
   * Calculates the new position of a dragged component within the canvas boundaries.
   * @param {object} currentPosition - The current position of the component { x, y }.
   * @param {object} delta - The change in position from the drag event { x, y }.
   * @param {object} canvasRect - The bounding rectangle of the canvas { width, height }.
   * @param {number} elementWidth - The width of the dragged element.
   * @param {number} elementHeight - The height of the dragged element.
   * @returns {object} The new position { x, y } clamped within the canvas boundaries.
   */
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
  /**
   * Creates a new component object based on a source component and assigns a unique ID.
   * @param {object} sourceComponent - The component object to clone.
   * @param {object} position - The initial position for the new component { x, y }.
   * @param {number} idCounter - A counter to generate a unique ID.
   * @returns {object} A new component object with updated ID, name, and position.
   */
  createNewComponent(sourceComponent, position, idCounter) {
    return {
      ...sourceComponent,
      id: `${sourceComponent.type}-${idCounter}`,
      name: `${sourceComponent.type}-${idCounter}`,
      position,
    };
  },

};