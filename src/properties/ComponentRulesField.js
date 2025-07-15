import React, { useState } from "react";

export function ComponentRulesField({ rules, onRuleChange }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex flex-col space-y-3">
                <label className="font-semibold text-[rgba(18,49,50,0.5)]">Regras de Negócios</label>
                <button
                    onClick={() => setShowModal(true)}
                    className="h-9 leading-none cursor-pointer text-[16px] font-semibold bg-[rgba(18,49,50,1)] hover:bg-[rgba(28,66,67,1)]
                             text-white px-3 py-1 rounded-3xl"
                >
                    Abrir
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[rgba(18,49,50,1)] p-6 rounded shadow-lg w-96 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                            aria-label="Fechar"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Regras de Negócios</h2>
                        {rules.map((opt) => (
                            <p key={opt}>{opt}</p>

                        ))}
                    </div>
                </div>
            )}
        </>
    );
}