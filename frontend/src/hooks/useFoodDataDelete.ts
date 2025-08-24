import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const deleteData = async (id: number) => {
  await axios.delete(`${API_URL}/food/${id}`);
};

export function useFoodDataDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteData,
    retry: 2,
    onSuccess: () => {
      // Atualiza a lista automaticamente depois de deletar
      queryClient.invalidateQueries({ queryKey: ["food-data"] });
    },
  });
}
