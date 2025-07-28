import React from "react";
import { SOURCE_TYPE } from "@/constants/Components";
import { Info } from "lucide-react";

export function ComponentSelectFields({ source, onSourceChange, multi, onMultiChange, extern, onExternChange }) {
    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-3">
                <div className="flex flex-row space-x-1 items-center">
                    <label className="font-semibold text-[rgba(18,49,50,0.5)]">Fonte</label>
                    <div className="relative group">
                        <Info className="w-4 h-4 text-[rgba(18,49,50,0.5)] cursor-pointer" />

                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-[220px] bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
                            tootltip
                            {/* Setinha para baixo apontando pro ícone */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </div>
                    </div>
                </div>
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
                {source.includes("Fonte Externa") && (
                    <div className="flex flex-col space-y-3">
                        <label className="font-semibold text-[rgba(18,49,50,0.5)]">Se Externa,qual? </label>
                        <input
                            type="text"
                            value={extern}
                            onChange={(e) => onExternChange(e.target.value)}
                            placeholder="Informe a fonte externa"
                            className="border font-semibold bg-transparent border-gray-300 text-[rgba(18,49,50,1)] rounded px-3 py-2"
                        />
                    </div>
                )}
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