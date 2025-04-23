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
        <input
          type="text"
          placeholder={content}
          className="border border-gray-300 rounded px-3 py-2"
        />
      );
    case 'text':
      return <p className="text-gray-700">{content}</p>;
    case 'heading':
      return <h2 className="text-xl font-bold text-black">{content}</h2>;
    default:
      return null;
  }
};
