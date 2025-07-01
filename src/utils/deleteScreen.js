export const deleteScreen = async ({
  userId,
  projectId,
  telaId,
  onSuccess,
  onError,
}) => {
  try {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta tela?"
    );
    if (!confirmed) return;

    await fetch(
      `https://xjvf-6soq-uwxw.n7c.xano.io/api:X-N9-OyD/desenho`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: userId,
          projeto_id: projectId,
          tela: telaId,
        }),
      }
    );

    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("Erro ao deletar a tela:", error);
    if (onError) onError(error);
  }
};
