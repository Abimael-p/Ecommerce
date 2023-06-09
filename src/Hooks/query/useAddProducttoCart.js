import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { addProductToCart } from "../../services/Cart/addProductToCart";

export const useAddProductToCart = () => {
  const token = useSelector((store) => store.auth.token);

  const QueryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ quantity, productId }) =>
      addProductToCart({ token, quantity, productId }),
    onSuccess: async () => {
      await QueryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return mutation;
};
