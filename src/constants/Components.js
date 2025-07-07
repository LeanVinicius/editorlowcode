export const DEFAULT_COMPONENTS = [
  {
    id: "button",
    content: "Botão",
    type: "button",
    width: 175,
    height: 41,
    colorComponent: "#000000",
  },
  {
    id: "text",
    content: "Texto",
    type: "heading",
    width: 175,
    height: 41,
    colorComponent: "#000000",
  },
  {
    id: "input",
    content: "Campo",
    type: "input",
    width: 175,
    height: 64,
    colorComponent: "#000000",
    mandatory: "opcional",
  },
  { id: "select", content: "Seleção", type: "select",
    width: 175, height: 64, colorComponent: "#000000",
    mandatory: "opcional",
    multi: false
  },
  { id: "checkbox", content: "Checkbox", type: "checkbox" },
  { id: "calendar", content: "Data", type: "calendar" },
  { id: "toggle", content: "Opção", type: "toggle" },
  { id: "table", content: "Galeria", type: "slider" },
  { id: "kanbam", content: "Kanbam", type: "kanbam" },
];

export const CANVAS_DIMENSIONS = { width: 2000, height: 2000 };
export const DRAG_ACTIVATION_DISTANCE = 5;
export  const INTERACTIVE_COMPONENT_TYPES = [
  'input', 'select', 'checkbox', 'toggle', 'calendar'
];

export const MANDATORY_OPTIONS = {
  REQUIRED: 'obrigatorio',
  OPTIONAL: 'opcional'
};