import React from "react"
import { DATE_DEFAULT } from "@/constants/Components"

export function ComponentDateFields({
    defaultDate,
    onDefaultDateChange
}) {

    const otherDate = !DATE_DEFAULT.includes(defaultDate);


    const dateOptions = DATE_DEFAULT.map((option) => (
        <label key={option} className="flex items-center space-x-2">
            <input
                type="radio"
                name="defaultDate"
                value={option}
                className="form-radio h-4 w-4 accent-[rgba(18,49,50,1)] focus:ring-[rgba(18,49,50,0.5)]"
                onChange={(e) => onDefaultDateChange(e.target.value) }
                checked={defaultDate === option}
            />
            <span className="font-semibold text-[rgba(18,49,50,0.5)]">{option}</span>
        </label>
    ))

    return (
        <div className="flex flex-col space-y-3">
            <label className="font-semibold text-[rgba(18,49,50,0.5)]">Data Padrão</label>
            <div className="space-y-2">
                {dateOptions}
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="defaultDate"
                        value="Ex: hoje + 60 dias; a data desejada"
                        className="form-radio h-4 w-4 accent-[rgba(18,49,50,1)] focus:ring-[rgba(18,49,50,0.5)]"
                        onChange={(e) =>  onDefaultDateChange(e.target.value)}
                        checked={otherDate}
                    />
                    <span className="font-semibold text-[rgba(18,49,50,0.5)]">Regra ou data fixa</span>
                </label>
            </div>
            {otherDate && (
                <input
                    type="text"
                    value={defaultDate}
                    onChange={(e) => onDefaultDateChange(e.target.value)}
                    className="w-full px-3 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
                />
            )}
        </div>
    )
}
