import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";

export function ComponentRulesField({ rules, onRulesChange }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedRuleId, setSelectedRuleId] = useState(null);
    const [textAreaValue, setTextAreaValue] = useState("");
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto"; // reset
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [textAreaValue]);

    const handleSelectChange = (e) => {
        const id = e.target.value;
        setSelectedRuleId(id);
        const rule = rules.find((r) => String(r.id) === id);
        setTextAreaValue(rule?.regra || "");
    };

    const handleAddRule = () => {
        const newRule = {
            id: Date.now().toString(),
            regra: "Nova regra",
        };
        onRulesChange([...rules, newRule]);
        setSelectedRuleId(newRule.id);
        setTextAreaValue(newRule.regra);
    };

    const handleDeleteRule = () => {
        if (!selectedRuleId) return;
        if (!window.confirm("Tem certeza de que deseja apagar esta regra?")) return;
        const updatedRules = rules.filter((r) => String(r.id) !== selectedRuleId);
        onRulesChange(updatedRules);
        setSelectedRuleId(null);
        setTextAreaValue("");
    };

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setTextAreaValue(newText);

        const updatedRules = rules.map((r) =>
            String(r.id) === selectedRuleId ? { ...r, regra: newText } : r
        );
        onRulesChange(updatedRules);
    };

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
                    <div className="flex flex-col bg-[rgba(254,254,254,1)] p-6 rounded shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-[500px] relative space-y-3">
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setSelectedRuleId(null);
                                setTextAreaValue("")
                            }}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                            aria-label="Fechar"
                        >
                            &times;
                        </button>
                        <h2 className="text-[20px] font-bold text-[rgba(18,49,50,1)]">Regras de Negócios</h2>

                        <div className="flex items-center space-x-2 mb-4">
                            <select
                                value={selectedRuleId || ""}
                                onChange={handleSelectChange}
                                className="flex-grow rounded border border-[rgba(18,49,50,0.5)] px-3 py-1 text-[rgba(18,49,50,1)]"
                            >
                                <option value="">Selecione uma regra</option>
                                {rules.map((rule) => (
                                    <option key={rule.id} value={rule.id}>
                                        {rule.regra.slice(0, 30)}...
                                    </option>
                                ))}
                            </select>

                            <div
                                className="flex-shrink-0 min-w-[120px] bg-[rgba(18,49,50,1)] hover:bg-[rgba(28,66,67,1)] font-semibold cursor-pointer text-[16px] text-white px-3 py-1 rounded-3xl flex flex-row"
                                onClick={handleAddRule}
                            >
                                <Plus></Plus>
                                <p>Adicionar</p>
                            </div>

                        </div>

                        <textarea
                            value={textAreaValue}
                            ref={textAreaRef}
                            onChange={handleTextChange}
                            className=" w-full h-full rounded border border-[rgba(18,49,50,0.5)] px-3 py-1 p-3 text-[rgba(18,49,50,1)] 
                                      focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]"
                            placeholder="Escreva a regra aqui..."
                        />

                        <button
                            onClick={handleDeleteRule}
                            className="h-9 w-52 leading-none cursor-pointer text-[16px] font-semibold bg-red-600 hover:bg-red-500
                                      text-white px-3 py-1 rounded-3xl self-center"
                            disabled={!selectedRuleId}
                        >
                            Apagar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}