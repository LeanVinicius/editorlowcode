import React from "react";

export function ComponentRoleField({ role, onRoleChange }) {
    return <div className="flex flex-col space-y-3">
        <label className="font-semibold text-[rgba(18,49,50,0.5)]">Função</label>
        <input
            type="text"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full px-3 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
            placeholder="Digite a função do botão"
        />
    </div>
}