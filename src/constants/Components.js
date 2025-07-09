export const DEFAULT_COMPONENTS = [
  {
    id: "button",
    content: "Botão",
    type: "button",
    width: 175,
    height: 41,
    colorComponent: "#000000",
    role: "",
    business_rule : []
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
  {
    id: "select", content: "Seleção", type: "select",
    width: 175, height: 64, colorComponent: "#000000",
    mandatory: "opcional",
    multi: true
  },
  {
    id: "checkbox", content: "Checkbox", type: "checkbox",
    width: 175, height: 64, colorComponent: "#000000",
    mandatory: "opcional",
    options: ["Opção 1", "Opção 2", "Opção 3"],
  },
  {
    id: "calendar", content: "Data", type: "calendar",
    width: 175, height: 64, colorComponent: "#000000",
    mandatory: "opcional",
  },
  {
    id: "toggle", content: "Opção", type: "toggle",
    width: 175, height: 64, colorComponent: "#000000",
    mandatory: "opcional",
    options: ["Opção 1", "Opção 2", "Opção 3"],
  },
  {
    id: "table", content: "Galeria", type: "table",
    width: 229, height: 110,
    colorComponent: "#000000",
    data: [{
      "id": 1,
      "matricula": "001",
      "nome": "João",
      "mes": "Agosto",
      "ano": "2023",
      "status": "Não enviado",
    }, {
      "id": 2,
      "matricula": "002",
      "nome": "Pedro",
      "mes": "Outubro",
      "ano": "2025",
      "status": "Não enviado",
    }]
  },
  { id: "kanbam", content: "Kanbam", type: "kanbam",
    width: 229, height: 110,
    colorComponent: "#000000",
   },
];

export const CANVAS_DIMENSIONS = { width: 2000, height: 2000 };
export const DRAG_ACTIVATION_DISTANCE = 5;
export const INTERACTIVE_COMPONENT_TYPES = [
  'input', 'select', 'checkbox', 'toggle', 'calendar'
];
export const OPTION_COMPONENT_TYPES = [
  'select', 'checkbox'
]

export const MANDATORY_OPTIONS = {
  REQUIRED: 'obrigatorio',
  OPTIONAL: 'opcional'
};