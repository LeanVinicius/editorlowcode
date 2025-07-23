import React from 'react';
import { X } from 'lucide-react';

export function ComponentKanbamFields({ buckets, onBucketChange }) {

    const handleAddTask = (bucketId) => {
        const updatedBuckets = buckets.map((bucket) => {
            if (bucket.id === bucketId) {
                const lastId = bucket.tasks.length > 0 ? Math.max(...bucket.tasks.map(t => t.id)) : 0;
                const newTask = {
                    id: lastId + 1,
                    task: randomTaskName(), // Nome da tarefa aleatório
                    inf: randomTaskInfo(),  // Informação adicional opcional
                };
                return {
                    ...bucket,
                    tasks: [...bucket.tasks, newTask],
                };
            }
            return bucket;
        });
        onBucketChange(updatedBuckets);
    }

    function randomTaskName() {
        const verbs = ["Criar", "Atualizar", "Remover", "Testar", "Analisar"];
        const nouns = ["API", "Dashboard", "Componente", "Layout", "Relatório"];
        return `${verbs[Math.floor(Math.random() * verbs.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
    }

    function randomTaskInfo() {
        const infos = ["Alta prioridade", "Aguardando revisão", "Rascunho", "Aprovar até sexta", "Bloqueado"];
        return infos[Math.floor(Math.random() * infos.length)];
    }

    const handleDeleteTask = (bucketId) => {
        const updatedBuckets = buckets.map((bucket) => {
            if (bucket.id === bucketId) {
                const updatedTasks = bucket.tasks.slice(0, -1); // remove a última task
                return {
                    ...bucket,
                    tasks: updatedTasks,
                };
            }
            return bucket;
        });
        onBucketChange(updatedBuckets);
    }

    const handleEditBucket = (id, newValue) => {
        const updated = buckets.map(o => o.id === id ? { ...o, bucket: newValue } : o);
        console.log('Novo buckets:', updated);
        onBucketChange(updated);
    };

    const handleDeleteBucket = (id) => {
        const updated = buckets.filter(o => o.id !== id);
        onBucketChange(updated);
    };

    return (
        <div className='flex flex-col space-y-3'>
            <label className='font-semibold text-[rgba(18,49,50,0.5)]'>Cards</label>
            <div className='space-y-2 overflow-y-auto'>

            </div>
            <div className='flex flex-col justify-center space-y-2'>
                {buckets.map((bucket) => (
                    <div key={bucket.id} className='flex flex-col space-y-3'>
                        <div className='flex justify-between w-full pl-3 pr-1 py-1 font-semibold rounded border border-[rgba(18,49,50,0.5)] cursor-pointer hover:bg-gray-200 text-[rgba(18,49,50,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(18,49,50,1)]'>
                            <input
                                type="text"
                                value={bucket.bucket}
                                onChange={(e) => handleEditBucket(bucket.id, e.target.value)}
                                className=""
                                placeholder="Edite o nome"
                            />
                            <X className='h-[15px] w-[15px] text-[rgba(18,49,50,1)] hover:text-[#6aaeb1] self-start'
                                onClick={() => handleDeleteBucket(bucket.id)}
                            ></X>
                        </div>
                        <div className='flex flex-row'>
                            <button className='h-9 leading-none cursor-pointer text-[16px] font-semibold bg-[rgba(18,49,50,1)] hover:bg-[rgba(28,66,67,1)]
                               text-white px-3 py-1 rounded-3xl'
                                onClick={() => handleAddTask(bucket.id)}
                            >
                                Adicionar tarefa
                            </button>
                            <button
                                onClick={() => handleDeleteTask(bucket.id)}
                                className="h-9 leading-none cursor-pointer text-[16px] font-semibold bg-red-600 hover:bg-red-500
                                         text-white px-3 py-1 rounded-3xl"
                            >
                                Deletar tarefa
                            </button>
                        </div>
                    </div>
                ))}


                {/* <button className='h-9 leading-none cursor-pointer text-[16px] font-semibold bg-red-600 hover:bg-red-500
                               text-white px-3 py-1 rounded-3xl'
                    onClick={handleDeleteData}
                >
                    Deletar último dado
                </button> */}
            </div>
        </div>
    );
}