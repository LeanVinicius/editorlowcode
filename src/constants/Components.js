/**
  * @typedef {object} Component
  * @property {string} id - Identificador único do componente.
  * @property {string} content - Conteúdo textual padrão do componente.
  * @property {string} type - Tipo do componente (ex: 'button', 'input').
  * @property {number} width - Largura padrão do componente.
  * @property {number} height - Altura padrão do componente.
  * @property {string} colorComponent - Cor padrão do componente (em formato hexadecimal).
  * @property {string} [role] - Role/função do componente do botão.
  * @property {Array<any>} [rules] - Regras de negócio associadas ao componente.
  * @property {string} [information] - Tipo da informação do componente campo de texto.
  * @property {string} [restriction] - Tipo de restrição do componente campo de texto.
  * @property {string} [mandatory] - Indica se o componente é obrigatório ('obrigatorio' ou 'opcional').
  * @property {boolean} [multi] - Indica se o componente é multi-seleção (true/false).
  * @property {string} [source] - Fonte de dados do componente.
  * @property {Array<object>} [buckets] - Buckets para o componente Kanbam
  * @property {string} [default] - Data padrão para o componente Data
  * @property {Array<string>} [options] - Opções para componentes de seleção (ex: 'select', 'checkbox').
  * @property {Array<object>} [data] - Dados para componentes de lista/tabela.
  */

/**
  * Array contendo as definições padrão para cada tipo de componente disponível na paleta.
  * Essas definições incluem propriedades iniciais como ID, tipo, dimensões, conteúdo, etc.
  * @type {Array<Component>}
  */
export const DEFAULT_COMPONENTS = [
  {
    id: "button",
    content: "Botão",
    type: "button",
    width: 175,
    height: 44,
    colorComponent: "#000000",
    role: "",
    rules: []
  },
  {
    id: "text",
    content: "Texto",
    type: "heading",
    width: 175,
    height: 41,
    colorComponent: "#000000",
    rules: []
  },
  {
    id: "input",
    content: "Campo",
    type: "input",
    width: 175,
    height: 78,
    colorComponent: "#000000",
    mandatory: "opcional",
    rules: [],
    information: "Texto Livre",
    restriction: "Nenhuma"
  },
  {
    id: "select", content: "Seleção", type: "select",
    width: 175, height: 64, colorComponent: "#000000",
    mandatory: "opcional",
    multi: true,
    rules: [],
    options: [{ "id": 1, "Opcao": "Opção 1" }, { "id": 2, "Opcao": "Opção 2" }, { "id": 3, "Opcao": "Opção 3" }],
    source: "Alimentação Direta",
    extern: ""
  },
  {
    id: "checkbox", content: "Checkbox", type: "checkbox",
    width: 186, height: 64, colorComponent: "#000000",
    mandatory: "opcional",
    options: [{ "id": 1, "Opcao": "Opção 1" }, { "id": 2, "Opcao": "Opção 2" }, { "id": 3, "Opcao": "Opção 3" }],
    direction: "vertical",
    rules: []
  },
  {
    id: "calendar", content: "Data", type: "calendar",
    width: 175, height: 82, colorComponent: "#000000",
    mandatory: "opcional",
    rules: [],
    defaultDate: "Sem Data",

  },
  {
    id: "toggle", content: "Opção", type: "toggle",
    width: 175, height: 64, colorComponent: "#000000",
    mandatory: "opcional",
    options: [{ "id": 1, "Opcao": "Opção 1" }, { "id": 2, "Opcao": "Opção 2" }, { "id": 3, "Opcao": "Opção 3" }],
    rules: [],
    direction: "vertical"
  },
  {
    id: "table", content: "Galeria", type: "table",
    width: 229, height: 110,
    colorComponent: "#000000",
    data: [{
      "id": 1,
      "matricula": "001",
      "nome": "João",
      "email": "joao@gmail.com",
      "ano": "2023",
      "status": "Não enviado",
    }, {
      "id": 2,
      "matricula": "002",
      "nome": "Pedro",
      "email": "pedro@gmail.com",
      "ano": "2025",
      "status": "Não enviado",
    },
    {
      "id": 3,
      "matricula": "003",
      "nome": "Maria",
      "email": "maria@gmail.com",
      "ano": "2024",
      "status": "Não enviado",
    },
    {
      "id": 4,
      "matricula": "004",
      "nome": "Ana",
      "email": "ana@gmail.com",
      "ano": "2023",
      "status": "Não enviado",
    },
    {
      "id": 5,
      "matricula": "005",
      "nome": "Carlos",
      "email": "carlos@gmail.com",
      "ano": "2025",
      "status": "Não enviado",
    },
    ],
    rules: []
  },
  {
    id: "kanbam", content: "Kanbam", type: "kanbam",
    width: 229, height: 110,
    colorComponent: "#000000",
    rules: [],
    buckets: [{ "id": 1, "bucket": "Backlog", "tasks": [{ "id": 1, "task": "Task 1", "inf": "teste" }, { "id": 2, "task": "Task 2", "inf": "teste" }, { "id": 3, "task": "Task 3", "inf": "teste" }] },
    { "id": 2, "bucket": "To Do", "tasks": [{ "id": 1, "task": "Task 1", "inf": "teste"}, { "id": 2, "task": "Task 2", "inf": "teste" }, { "id": 3, "task": "Task 3", "inf": "teste" }] },
    { "id": 3, "bucket": "Doing", "tasks": [{ "id": 1, "task": "Task 1", "inf": "teste" }, { "id": 2, "task": "Task 2", "inf": "teste" }, { "id": 3, "task": "Task 3", "inf": "teste" }] },
    { "id": 4, "bucket": "Done", "tasks": [{ "id": 1, "task": "Task 1", "inf": "teste" }, { "id": 2, "task": "Task 2", "inf": "teste" }, { "id": 3, "task": "Task 3", "inf": "teste" }] }]
  },
];


/**
  * Objeto que define as dimensões (largura e altura) da área do canvas de design.
  * @type {{width: number, height: number}}
  */
export const CANVAS_DIMENSIONS = { width: 2000, height: 2000 };

/**
  * Distância mínima em pixels que o ponteiro deve se mover para iniciar uma operação de drag.
  * Usado para evitar drags acidentais ao clicar.
  * @type {number}
  */
export const DRAG_ACTIVATION_DISTANCE = 5;

/**
  * Objeto com constantes para as opções de status de obrigatoriedade de um componente.
  * @type {{REQUIRED: string, OPTIONAL: string}}
  */
export const MANDATORY_OPTIONS = {
  REQUIRED: 'obrigatorio',
  OPTIONAL: 'opcional'
};

export const IMFORMATION_TYPE = [
  'Texto Livre', 'Dinheiro', 'CPF/CNPJ', 'Outro'
]

export const RESTRICTION_TYPE = [
  'Nenhuma', 'Apenas Texto', 'Apenas Número'
]

export const SOURCE_TYPE = [
  'Alimentação Direta', 'Fonte Externa', 'Fonte Externa com Inserção'
]

export const DATE_DEFAULT = [
  'Sem Data', 'Data de Hoje'
]