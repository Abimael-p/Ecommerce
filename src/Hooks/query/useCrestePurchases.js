import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPurchase } from "../../services/purchases/createPurchases";
import { useSelector } from "react-redux";

export const userCreatePurchases = () => {
  const token = useSelector((store) => store.auth.token);
  const queryCliente = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createPurchase(token),
    onSuccess: async () => {
      await queryCliente.invalidateQueries({ queryKey: ["cart"] });
      await queryCliente.invalidateQueries({ queryKey: ["purchases"] });
    },
  });

  return mutation;
};
