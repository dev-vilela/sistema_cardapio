import { useEffect, useState } from "react";
import { useFoodData } from "../../hooks/useFoodData";
import { useFoodDataDelete } from "../../hooks/useFoodDataDelete";
import "./delete.css"

interface DeleteModalProps {
  closeModal(): void;
}

export function DeleteModal({ closeModal }: DeleteModalProps) {
  const { data } = useFoodData();
  const { mutate: deleteFood, isSuccess, isPending } = useFoodDataDelete();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDelete = () => {
    if (selectedId) {
      deleteFood(selectedId);
    }
  };

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Deletar item</h2>

        <label>Selecione o item para excluir:</label>
        <select 
          onChange={(e) => setSelectedId(Number(e.target.value))} 
          value={selectedId ?? ""}
        >
          <option value="">-- Escolha um item --</option>
          {data?.map(item => (
            <option key={item.id} value={item.id}>{item.title}</option>
          ))}
        </select>

        <div className="modal-actions">
          <button onClick={closeModal} className="btn-cancel" disabled={isPending}>
            Cancelar
          </button>
          <button 
            onClick={handleDelete} 
            className="btn-danger" 
            disabled={!selectedId || isPending}
          >
            {isPending ? "Deletando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
