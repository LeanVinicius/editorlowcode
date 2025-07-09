## Documentação do projeto

### src/app/page.js
Este arquivo serve como o ponto de entrada principal da aplicação. Ele é responsável por renderizar o componente `CanvasDesigner`, que é a interface central do usuário. Além disso, utiliza o componente `Suspense` do React para gerenciar o estado de carregamento inicial, exibindo uma mensagem enquanto o `CanvasDesigner` está sendo carregado.


### src/components/CanvasDesigner.jsx
Este é o componente principal da interface de design. É responsável por orquestrar diversas funcionalidades, incluindo:
- **Gerenciamento do estado:** Controla os componentes presentes no canvas, a seleção de componentes, e o estado das diferentes telas (adição, exclusão, seleção, renomeação). Utiliza hooks customizados como `useCanvasState` e `useScreenManager` para isso.
- **Interatividade:** Implementa a funcionalidade de drag and drop para adicionar e mover componentes no canvas usando `@dnd-kit/core`. Também lida com a seleção de componentes, salvamento e limpeza do canvas, e exclusão de telas.
- **Integração com a API:** Interage com a `CanvasApi` para carregar e salvar o estado do canvas e das telas no backend.
- **Renderização da Interface:** Monta a interface visual do designer, incluindo a barra lateral de componentes, a área do canvas onde os componentes são dispostos, o painel de propriedades para editar componentes selecionados, e as abas para navegar entre as diferentes telas.

### src/components/DroppableArea.js
Este componente é uma área designada no layout onde outros elementos podem ser arrastados e soltos. Ele utiliza o hook `useDroppable` da biblioteca `@dnd-kit/core` para registrar essa área com o sistema de drag and drop. O componente recebe um `id` único para ser identificado e renderiza seus `children` dentro dessa área. Ele também fornece feedback visual, alterando seu estilo (como a cor de fundo) quando um elemento está sendo arrastado sobre ele (`isOver`).

### src/utils/DragAndDropHelpers.js

Este arquivo exporta um objeto `dragHelpers` contendo funções utilitárias para a lógica de drag and drop. As principais funções são:

*   `calculateMovePosition`: Calcula a nova posição de um componente arrastado, garantindo que ele permaneça dentro dos limites da área do canvas.
*   `createNewComponent`: Cria um novo objeto de componente com base em um componente de origem e gera um ID único para ele.

### src/hooks/useCanvasState.js

Este hook customizado (`useCanvasState`) é responsável por gerenciar o estado global dos componentes presentes na área do canvas. Ele encapsula a lógica para adicionar, remover, atualizar e selecionar componentes, bem como gerenciar o contador de IDs para novos componentes.

**Estados Gerenciados:**

*   `canvasComponents`: Array contendo todos os componentes no canvas.
*   `selectedComponent`: O componente atualmente selecionado para edição de propriedades.
*   `componentIdCounter`: Contador utilizado para gerar IDs únicos para novos componentes.

**Funções Principais:**

O hook retorna um objeto com diversas funções para interagir com o estado do canvas, incluindo (mas não se limitando a):

*   `setCanvasComponents`: Define diretamente o array de componentes.
*   `updateComponentContent`: Atualiza o conteúdo de um componente específico.
*   `updateComponentName`: Atualiza o nome de um componente.
*   `updateComponentSize`: Atualiza as dimensões (largura/altura) de um componente.
*   `updateComponentColor`: Atualiza a cor de um componente.
*   `updateComponentMandatory`: Define se um componente é obrigatório.
*   `updateComponentRole`: Define o role/papel de um componente.
*   `updateComponentPosition`: Atualiza a posição de um componente no canvas.
*   `addComponent`: Adiciona um novo componente ao canvas.
*   `removeComponent`: Remove um componente do canvas.
*   `clearCanvas`: Remove todos os componentes do canvas.
*   `selectComponent`: Define qual componente está selecionado.
