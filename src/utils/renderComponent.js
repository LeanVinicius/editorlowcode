export const renderComponent = (type, content, color) => {
  // TODO: colocar style para cada componente? e usar o props?
  switch (type) {
    case 'button':
      return (
        <button className={color ? 'px-4 py-2' : 'bg-blue-500 px-4 py-2 rounded-[32px]'}>
          {content}
        </button>
      );
    case 'input':
      return (
        <div className="flex h-full flex-col">
          <div className="bg-transparent ">{content}</div>
          <input
            type="text"
            placeholder="Campo de Entrada"
            className="border h-full bg-transparent sgrow flex-1 border-gray-300 text-black rounded px-3 py-2"
          />
        </div>
      );
      case 'select':
      return (
        <div className="flex h-full flex-col">
          <div className="bg-transparent ">{content}</div>
          <select className="border h-full bg-transparent grow flex-1 border-gray-300 text-black rounded px-3 py-2">
            <option value="">Selecionar</option>
            <option value="opcao1">Opção 1</option>
            <option value="opcao2">Opção 2</option>
          </select>
        </div>
      );
    case 'heading':
      return <h2 className="text-xl font-bold">{content}</h2>;

    default:
      return null;
  }
};
