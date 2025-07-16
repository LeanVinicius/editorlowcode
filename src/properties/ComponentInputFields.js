import { RESTRICTION_TYPE, IMFORMATION_TYPE } from "@/constants/Components";

export function ComponentInputFields({
    information,
    restriction,
    onInformationChange,
    onRestrictionChange
}) {
    return (
        <div className='flex flex-col space-y-5'>
            <div className="flex flex-col space-y-3">
                <label className="font-semibold text-[rgba(18,49,50,0.5)]">Tipo de informação</label>
                <select
                    className="border font-semibold bg-transparent border-gray-300 text-[rgba(18,49,50,1)] rounded px-3 py-2"
                    value={information}
                    onChange={(e) => onInformationChange(e.target.value)}
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
                    value={restriction}
                    onChange={(e) => onRestrictionChange(e.target.value)}
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