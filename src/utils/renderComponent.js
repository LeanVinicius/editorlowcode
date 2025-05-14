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
    case 'heading':
      return <h2 className="text-xl font-bold">{content}</h2>;

    default:
      return null;
  }
};
