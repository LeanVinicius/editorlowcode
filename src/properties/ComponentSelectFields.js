import React from "react";
import { SOURCE_TYPE } from "@/constants/Components";

export function ComponentSelectFields({ source, onSourceChange, multi, onMultiChange }) {
    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-3">
                <label className="font-semibold text-[rgba(18,49,50,0.5)]">Fonte</label>
                <select
                    className="border font-semibold bg-transparent border-gray-300 text-[rgba(18,49,50,1)] rounded px-3 py-2"
                    value={source}
                    onChange={(e) => onSourceChange(e.target.value)}
                >
                    {SOURCE_TYPE.map((opt, idx) => (
                        <option key={idx} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col space-y-3">
                <label className="font-semibold text-[rgba(18,49,50,0.5)]">Multi Seleção</label>
                <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="multi"
                            value={false}
                            className="form-radio h-4 w-4 accent-[rgba(18,49,50,1)] focus:ring-[rgba(18,49,50,0.5)]"
                            onChange={(e) => onMultiChange(e.target.value === "true")}
                            checked={!multi}
                        />
                        <span className="font-semibold text-[rgba(18,49,50,0.5)]">Seleção Única</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="multi"
                            value={true}
                            className="form-radio h-4 w-4 accent-[rgba(18,49,50,1)] focus:ring-[rgba(18,49,50,0.5)]"
                            onChange={(e) => onMultiChange(e.target.value === "true")}
                            checked={multi}
                        />
                        <span className="font-semibold text-[rgba(18,49,50,0.5)]">Seleção Múltipla</span>
                    </label>

                </div>
            </div>
        </div>

    )
}