import React, { useState } from "react";

export function ComponentRulesField({ rules, onRuleChange }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="mt-4">
                <label className="block mb-2 text-white">Regras de Negócios:</label>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Abrir
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-amber-600 p-6 rounded shadow-lg w-96 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                            aria-label="Fechar"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Regras de Negócios</h2>
                        {rules.map((opt) => (
                            <p>{opt}</p>

                        ))}
                    </div>
                </div>
            )}
        </>
    );
}