import React from "react";

export function ComponentDirectionField({ direction, onDirectionChange }) {

    return (

        <div className="flex flex-col space-y-3">
            <div className="flex flex-row space-x-1 items-center">
                <label className="font-semibold text-[rgba(18,49,50,0.5)]">Direção</label>
            </div>
            <select
                className="border font-semibold bg-transparent border-gray-300 text-[rgba(18,49,50,1)] rounded px-3 py-2"
                value={direction}
                onChange={(e) => onDirectionChange(e.target.value)}
            >
                <option value={"vertical"}>
                    Vertical
                </option>
                <option value={"horizontal"}>
                    Horizontal
                </option>
            </select>
        </div>
    )
}