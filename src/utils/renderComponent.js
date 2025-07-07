export const renderComponent = (component) => {
  // NOTE: caso adiciona propriedades a mais, mudar aqui tbm
  const {
    type,
    content,
    colorComponent = "#000000",
    options = [],
    multi = false,
  } = component;

  console.log("Opções recebidas:", options);
  // TODO: colocar style para cada componente? e usar o props?
  switch (type) {
    case 'button':
      return (
        <button className={colorComponent ? 'px-4 py-2' : 'bg-blue-500 px-4 py-2 rounded-[32px]'}>
          {content ?? "Botão"}
        </button>
      );
    case 'input':
      return (
        <div className="flex h-full flex-col">
          <div className="bg-transparent ">{content ?? "Título"}</div>
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
            <div className="text-sm mb-1">{content ?? "Seleção"}</div>
            <select
              multiple={multi}
              className="border bg-transparent border-gray-300 text-black rounded px-3 py-2"
            >
              {options.length > 0 ? (
                options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))
              ) : (
                <>
                  <option value="">Opção 1</option>
                  <option value="">Opção 2</option>
                </>
              )}
            </select>
          </div>
        );
      case 'checkbox':
        return (
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <label className="text-black">{content ?? "CheckBox"}</label>
          </div>
        );
      
    case 'heading':
      return <h2 className="text-xl font-bold">{content ?? "Texto"}</h2>;

    default:
      return null;
  }
};
