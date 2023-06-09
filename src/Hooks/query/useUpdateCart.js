import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { updateCart } from "../../services/Cart/updateCart";

export const useUpdateCart = () => {
  const token = useSelector((store) => store.auth.token);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ( carProductId, newQuantity ) =>
      updateCart({
        carProductId,
        newQuantity,
        token,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  
  return mutation
};
