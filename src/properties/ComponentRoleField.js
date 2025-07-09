import React from "react";

export function ComponentRoleField({ role, onRoleChange }) {
    return <><div className="mt-4">
        <label className="block mb-2 text-white">Função:</label>
        <input
            type="text"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite a função do botão"
        />
    </div></>
}