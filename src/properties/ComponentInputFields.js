import { RESTRICTION_TYPE, IMFORMATION_TYPE } from "@/constants/Components";

export function ComponentInputFields({ information, restriction }) {
    return (
        <div className='flex flex-col space-y-5'>
            <div className="flex flex-col space-y-3">
                <label className="font-semibold text-[rgba(18,49,50,0.5)]">Tipo de informação</label>
                <select
                    className="border font-semibold bg-transparent border-gray-300 text-[rgba(18,49,50,1)] rounded px-3 py-2"
                >
                    {IMFORMATION_TYPE.map((opt, idx) => (
                        <option key={idx} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col space-y-3">
                <label className="font-semibold text-[rgba(18,49,50,0.5)]">Restrição</label>
                <select
                    className="border font-semibold bg-transparent border-gray-300 text-[rgba(18,49,50,1)] rounded px-3 py-2"
                >
                    {RESTRICTION_TYPE.map((opt, idx) => (
                        <option key={idx} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}