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

### src/components/MoveableDesignComponent.js

Este componente `MoveableDesignComponent` atua como um "wrapper" para renderizar componentes individuais dentro da área de design e habilitar a funcionalidade de arrastar (drag) para eles.

Ele utiliza o hook `useDraggable` do `@dnd-kit/core` para tornar o componente arrastável. Gerencia o posicionamento absoluto no canvas e aplica estilos visuais básicos e específicos do tipo de componente.

Recebe props como `id`, `children` (o conteúdo do componente), `position`, `inCanvas` (indicando se está no canvas), `onClick`, `size` e `colorComponent` para configurar a aparência e comportamento.

### src/services/CanvasApi.js

Este arquivo define o serviço `CanvasApi`, que é responsável por toda a comunicação com a API de backend relacionada ao design do canvas e ao gerenciamento de telas. Ele centraliza as requisições HTTP, tornando o código que interage com o backend mais organizado.

**Funções de API:**

*   `loadCanvas(userId, projectId, screenId)`: Carrega os dados do canvas para um usuário, projeto e tela específicos. Retorna um array com os componentes do canvas.
*   `saveCanvas(userId, projectId, screenId, canvasData)`: Salva os dados atuais do canvas para um usuário, projeto e tela. `canvasData` deve ser uma string JSON dos componentes.
*   `loadScreens(userId, projectId)`: Carrega a lista de telas disponíveis para um usuário e projeto. Retorna um array de objetos representando as telas.
*   `createScreen(userId, projectId, screenId)`: Cria uma nova tela para um usuário e projeto com um ID de tela específico.
*   `updateScreenName(userId, projectId, screenId, newName)`: Atualiza o nome de uma tela existente com um novo nome.
*   `deleteScreen(userId, projectId, screenId)`: Exclui uma tela específica para um usuário e projeto.

### src/hooks/useScreenManager.js

Este hook customizado (`useScreenManager`) é responsável por gerenciar o estado e as operações das diferentes telas (screens) dentro de um projeto. Ele interage com o serviço `CanvasApi` para salvar, carregar e manipular dados de tela no backend, e utiliza funções de `ScreenHelpers` para auxiliar na manipulação local do estado das telas.

**Estados Gerenciados:**

*   `availableScreens`: Array contendo todas as telas disponíveis para o projeto.
*   `currentScreenId`: O ID da tela atualmente selecionada.
*   `currentScreenName`: O nome da tela atualmente selecionada.
*   `isEditingScreenName`: Booleano indicando se o nome da tela está sendo editado.
*   `temporaryScreenName`: Armazena temporariamente o novo nome da tela durante a edição.

**Funções Principais:**

O hook retorna um objeto com funções para interagir com o estado das telas, incluindo:

*   `setAvailableScreens`: Define diretamente o array de telas disponíveis.
*   `setCurrentScreenId`: Define o ID da tela atual.
*   `setCurrentScreenName`: Define o nome da tela atual.
*   `setIsEditingScreenName`: Define se o nome da tela está sendo editado.
*   `setTemporaryScreenName`: Define o nome temporário da tela durante a edição.
*   `createNewScreen`: Cria uma nova tela para o projeto.
*   `updateScreenName`: Atualiza o nome de uma tela existente.
*   `deleteScreen`: Exclui uma tela do projeto.
*   `selectScreen`: Define qual tela está selecionada e atualiza o nome da tela atual.

### src/utils/ScreenHelpers.js

Este arquivo exporta um objeto `ScreenHelpers` contendo funções utilitárias puras para manipular arrays de objetos que representam telas. Essas funções são usadas principalmente pelo hook `useScreenManager` para realizar operações na lista de telas sem modificar o estado diretamente, promovendo a imutabilidade e a organização do código.

**Funções Utilitárias:**

*   `sortScreens(screens)`: Recebe um array de telas e retorna um novo array com as telas ordenadas crescentemente pelo seu ID (`tela`).
*   `getNextScreenId(screens)`: Recebe um array de telas e calcula o próximo ID numérico disponível para uma nova tela. Retorna 1 se não houver telas existentes.
*   `updateScreenInList(screens, screenId, updates)`: Recebe um array de telas, um ID de tela e um objeto com as atualizações. Retorna um novo array com a tela correspondente ao `screenId` atualizada com as novas propriedades.
*   `removeScreenFromList(screens, screenId)`: Recebe um array de telas e um ID de tela. Retorna um novo array sem a tela que possui o `screenId` especificado.
*   `findScreen(screens, screenId)`: Recebe um array de telas e um ID de tela. Retorna o objeto da tela que corresponde ao `screenId`, ou `undefined` se não encontrar.
*   `createScreen(screenId, name = null)`: Cria e retorna um novo objeto que representa uma tela, com um ID (`screenId`) e um nome padrão (`Tela X`) ou especificado.

### src/utils/ComponentHelpers.js

Este arquivo exporta um objeto `ComponentHelpers` que contém funções utilitárias puras para manipular arrays de objetos que representam os componentes do canvas. Essas funções são usadas principalmente pelo hook `useCanvasState` para gerenciar a lista de componentes de forma imutável, como adicionar, remover e atualizar propriedades.

**Funções Utilitárias:**

*   `updateComponentProperty(components, componentId, property, value)`: Atualiza uma `property` com um determinado `value` para o componente com o `componentId` especificado no array `components`. Retorna um novo array.
*   `updateComponentSize(components, componentId, newSize)`: Atualiza as propriedades `width` e `height` de um componente específico (`componentId`) no array `components` com os valores em `newSize`. Retorna um novo array.
*   `updateComponentPosition(components, componentId, newPosition)`: Atualiza a propriedade `position` (objeto `{ x, y }`) de um componente específico (`componentId`) no array `components` com os valores em `newPosition`. Retorna um novo array.
*   `removeComponent(components, componentId)`: Remove o componente com o `componentId` especificado do array `components`. Retorna um novo array sem o componente removido.
*   `findComponent(components, componentId)`: Procura no array `components` pelo componente com o `componentId` especificado e o retorna. Retorna `undefined` se o componente não for encontrado.

### src/utils/renderComponent.js

Este arquivo exporta a função utilitária `renderComponent`. Sua principal responsabilidade é converter um objeto JavaScript que descreve um componente (incluindo seu tipo e propriedades) no elemento JSX correspondente que pode ser renderizado na interface de design.

A função `renderComponent` recebe um objeto `component` como parâmetro e utiliza um `switch` statement baseado na propriedade `component.type` para determinar qual tipo de elemento HTML ou componente React deve ser renderizado. Ele então aplica as propriedades relevantes do objeto `component` (como `content`, `colorComponent`, `options`, etc.) ao elemento renderizado.

Este arquivo é essencial para a visualização dos componentes no canvas, pois ele sabe como traduzir os dados abstratos de um componente em uma representação visual concreta.

### src/constants/Components.js

Este arquivo define constantes importantes utilizadas em toda a aplicação, principalmente relacionadas à configuração e definição dos componentes de design. Ele serve como uma fonte centralizada para as propriedades padrão dos componentes e outras configurações do canvas.

**Constantes Principais:**

*   `DEFAULT_COMPONENTS`: Um array de objetos, onde cada objeto representa a definição padrão de um tipo de componente disponível no editor (ex: botão, input, seleção). Inclui propriedades iniciais como `id`, `content`, `type`, `width`, `height`, `colorComponent`, `role`, etc.
*   `CANVAS_DIMENSIONS`: Objeto que especifica as dimensões padrão (`width`, `height`) da área de design do canvas.
*   `DRAG_ACTIVATION_DISTANCE`: Valor numérico que define a distância mínima de arrasto antes que a operação de drag and drop seja ativada.
*   `INTERACTIVE_COMPONENT_TYPES`: Array de strings contendo os `type`s dos componentes que são considerados interativos (geralmente campos de formulário).
*   `OPTION_COMPONENT_TYPES`: Array de strings contendo os `type`s dos componentes que suportam a definição de opções (como select e checkbox).
*   `MANDATORY_OPTIONS`: Objeto com constantes (`REQUIRED`, `OPTIONAL`) para os possíveis valores da propriedade de obrigatoriedade de um componente.

### src/utils/UserCanvasLoader.js

Este "componente" (`UserCanvasLoader`) não renderiza nenhuma interface visual (`return null`). Sua finalidade principal é **carregar os dados iniciais** das telas e do canvas da API de backend quando o componente é montado na aplicação (geralmente no início do fluxo do `CanvasDesigner`).

Ele obtém os parâmetros de `userId` e `projectId` da URL e, se `shouldLoad` for verdadeiro, realiza as seguintes operações assíncronas em sequência:

1.  Carrega a lista de telas disponíveis usando `CanvasApi.loadScreens`.
2.  Processa os dados das telas e chama a função `screens` (passada via props) com esses dados.
3.  Seleciona a primeira tela carregada.
4.  Chama a função `selectScreen` (passada via props) com o ID da primeira tela.
5.  Carrega os componentes do canvas para a primeira tela selecionada usando `CanvasApi.loadCanvas`.
6.  Chama a função `onDataLoaded` (passada via props) com os dados dos componentes do canvas carregados.

Ele é essencial para inicializar o estado da aplicação com os dados persistidos no backend.

**Props:**

*   `onDataLoaded(canvasData)`: Função chamada com os dados dos componentes do canvas após o carregamento bem-sucedido.
*   `shouldLoad`: Booleano que indica se o carregamento inicial deve ocorrer.
*   `screens(screenData)`: Função chamada com os dados das telas disponíveis após o carregamento.
*   `selectScreen(screenId)`: Função chamada para definir a tela atualmente selecionada após o carregamento.

### src/components/ComponentsSidebar.js

Este componente (`ComponentsSidebar`) renderiza a barra lateral que exibe a lista de componentes disponíveis para serem adicionados à área de design do canvas. Ele é um componente de apresentação que recebe os dados dos componentes e uma função para lidar com o clique neles.

**Props:**

*   `availableComponents`: Um array de objetos, onde cada objeto representa um componente disponível a ser exibido na barra lateral. Geralmente vem da constante `DEFAULT_COMPONENTS`.
*   `onComponentClick(component)`: Função chamada quando um componente na lista da barra lateral é clicado. O objeto do componente clicado é passado como argumento. Esta função é usada para adicionar o componente selecionado ao canvas.

### src/hooks/useComponentProperties.js

Este hook customizado (`useComponentProperties`) é responsável por gerenciar o estado do formulário utilizado no painel de propriedades para editar um componente selecionado. Ele mantém uma cópia local das propriedades editáveis do componente e fornece uma forma de atualizá-las.

**Prop:**

*   `component`: O objeto do componente atualmente selecionado cujas propriedades devem ser exibidas e editadas.

**Estados e Funções Retornadas:**

*   `formData`: Um objeto que armazena os valores atuais dos campos do formulário de propriedades do componente. É sincronizado com as propriedades do `component` passado.
*   `updateField(field, value)`: Função utilizada para atualizar o valor de um campo específico (`field`) dentro do `formData` com o novo `value`.

Este hook é fundamental para a funcionalidade do painel de propriedades, garantindo que as informações do componente selecionado sejam exibidas corretamente e possam ser modificadas.

### src/components/ComponentProperties.js

Este componente (`ComponentProperties`) renderiza o painel lateral na interface de design que permite aos usuários visualizar e editar as propriedades do componente atualmente selecionado no canvas. Ele atua como um orquestrador para os diferentes campos de propriedade e ações disponíveis.

**Props:**

*   `component`: O objeto do componente atualmente selecionado cujas propriedades devem ser exibidas no painel. Se for `null` ou `undefined`, o painel não é renderizado.
*   `onUpdateSize(componentId, newSize)`: Função chamada para atualizar as dimensões (largura/altura) do componente no estado global do canvas.
*   `onUpdateContent(componentId, newContent)`: Função chamada para atualizar o conteúdo (texto, rótulo, etc.) do componente.
*   `onUpdateColor(componentId, newColor)`: Função chamada para atualizar a cor do componente.
*   `onDelete(componentId)`: Função chamada para remover o componente selecionado do canvas.
*   `onUpdateName(componentId, newName)`: Função chamada para atualizar o nome do componente.
*   `onUpdateMandatory(componentId, value)`: Função chamada para atualizar a propriedade de obrigatoriedade do componente.
*   `onUpdateMulti(componentId, value)`: Função chamada para atualizar a propriedade `multi` (usada em `select`).
*   `onUpdateOptions(componentId, newOptions)`: Função chamada para atualizar as opções de componentes que as suportam (como `select` e `checkbox`).
*   `onUpdateRole(componentId, newRole)`: Função chamada para atualizar a propriedade `role` do componente (usada em `button`).

Este componente utiliza o hook `useComponentProperties` para gerenciar o estado local dos dados do formulário e renderiza condicionalmente diferentes componentes de campo de propriedade (`ComponentBasicFields`, `ComponentSizeFields`, etc.) e ações (`ComponentActions`) com base no tipo e propriedades do componente selecionado.





