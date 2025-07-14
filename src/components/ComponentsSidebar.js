/**
  * @param {object} props - As propriedades do componente.
  * @param {Array<object>} props.availableComponents - Um array de objetos, onde cada objeto representa um componente disponível para adicionar ao canvas.
  * @param {(component: object) => void} props.onComponentClick - Função chamada quando um componente na barra lateral é clicado. Recebe o objeto do componente clicado como argumento.
  * @returns {JSX.Element} Renderiza a barra lateral com a lista de componentes disponíveis.
  */
export function ComponentsSidebar({ availableComponents, onComponentClick }) {
  return (
    <div className="w-full flex flex-col justify-between  rounded-lg">

      <div className="flex justify-center flex-row ">
        {availableComponents.map((component) => (

          <div
            key={component.id}
            onClick={() => onComponentClick(component)}
            className="text-[rgba(18,49,50,1)] font-semibold cursor-pointer pb-2.5 px-1.5 border-b-[2px] border-b-[rgba(0,0,0,0.2)]
             hover:bg-gray-100 w-[79px] flex flex-col justify-center text-center items-center"
          >
            <img src={`/icons/${component.type}.png`}
              className="w-[44px] h-[44px]"
            ></img>
            {component.content}
          </div>
        ))}
      </div>
      <p className="pt-1 text-base font-normal leading-none tracking-normal flex justify-center text-[rgba(18,49,50,1)]">
        Componentes
      </p>
    </div>
  );
}
