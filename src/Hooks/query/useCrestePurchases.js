import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPurchase } from "../../services/purchases/createPurchases";
import { useSelector } from "react-redux";

export const userCreatePurchases = () => {
  const queryClient = useQueryClient();
  const token = useSelector((store) => store.auth.token);

  const mutation = useMutation(({ productId, quantity }) => createPurchase(token, productId, quantity), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      await queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });

  return mutation;
};
