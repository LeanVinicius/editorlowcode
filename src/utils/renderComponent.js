
/**
 * Renderiza o JSX correspondente a um objeto de componente.
 * Baseia-se no `component.type` para determinar qual elemento React renderizar.
 * @param {object} component - O objeto que descreve o componente a ser renderizado.
 * @returns {JSX.Element|null} O elemento React correspondente ao componente, ou null se o tipo for desconhecido.
 */
export const renderComponent = (component) => {

  // NOTE: caso adicionar propriedades visuais a mais, mudar aqui tbm
  const {
    type,
    content,
    colorComponent = "#000000",
    options = [],
    multi = false,
    data = [],
  } = component;

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
            className="border h-full bg-transparent border-gray-300 text-black rounded px-3 py-2"
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
    case "toggle":
      return (
        <div className="flex items-center gap-2">
          <label className="text-sm">{content ?? "Opção"}</label>
          <input type="radio" name="radio" className="w-6 h-3 rounded-full" />
          <label className="text-sm">{content ?? "Opção"}</label>
          <input type="radio" name="radio" className="w-6 h-3 rounded-full" />
        </div>
      );
    case 'calendar':
      return (
        <div className="flex h-full flex-col">
          <div className="bg-transparent ">{content ?? "Data"}</div>

          <input
            type="date"
            className="border h-full bg-transparent sgrow flex-1 border-gray-300 text-black rounded px-3 py-2"
          />

        </div>
      );
    case 'table':
      return (
        <div className="border-1 rounded-[20px] bg-transparent sgrow border-gray-300"
        >
          <table className="min-w-full mb-[12px]">
            {data.length > 0 ? (
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key, idx) => (
                    <th key={idx} className="p-[12px]  h-[40px] border-b text-left capitalize">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : (
              <thead>
                <tr>
                  <th className="p-[12px] h-[40px] border-b text-left capitalize">
                    Matrícula
                  </th>
                </tr>
              </thead>
            )}
            <tbody>
              {data.length > 0 ? (
                data.map((item, i) => (
                  <tr key={item.id ?? i} className="hover:bg-gray-50">
                    {Object.values(item).map((val, j) => (
                      <td key={j} className="p-[12px] h-[40px] border-b">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-[12px] border-b">Nenhum dado</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      );
    case 'kanbam':
      return (
        <div className="flex flex-col space-y-3 h-full p-3 border-1 rounded-[20px] bg-transparent  border-gray-300"
        >
          <div className="bg-[RGBA(130,130,130,0.08)] text-gray-700 font-bold w-min rounded-[20px] pt-1 pb-1 pr-3 pl-3">Titulo</div>
          <div className="flex flex-col p-3 border-1 rounded-[20px] bg-transparent border-gray-300"
          >
            <div className="bg-[RGBA(130,130,130,0.08)] rounded-[20px] pt-1 pb-1 pr-3 pl-3">Titulo</div>
            <div>ghghgh</div>
          </div>
        </div>
      );
    case 'heading':
      return <h2 className="text-xl font-bold">{content ?? "Texto"}</h2>;

    default:
      return null;
  }
};
