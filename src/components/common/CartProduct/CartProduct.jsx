import { useState } from "react";
import "./CartProduct.css";
import { useUpdateCart } from "../../../Hooks/query/useUpdateCart";
import { useSelector } from "react-redux";
import { useDeleteProductFromCart } from "../../../Hooks/query/useDeleteProductFromCart";

const CartProduct = ({ cartProduct }) => {
  const initialQuantity = Number(cartProduct.quantity);
  const price = Number(cartProduct.product.price);
  const { mutate, isLoading } = useUpdateCart();
  const deleteMutation = useDeleteProductFromCart();
  const [quantity, setQuantity] = useState(initialQuantity);
  const islogged = useSelector((store) => store.auth.isloggedIn);

  const increment = () => {
    const newQuantity = quantity + 1;
    const stockIncrement = 10;
    if (newQuantity <= stockIncrement) setQuantity(newQuantity);

  };

  const decrement = () => {
    const newQuantity = quantity - 1;
    const stockDecrement = 1;
    if (newQuantity >= stockDecrement) setQuantity(newQuantity);
};

  const handleUpdate = () => {
    if (islogged)
      mutate({ cartProductId: cartProduct.id, newQuantity: quantity });
  };

  const handleDelete = () => {
    if (! deleteMutation.isLoading) deleteMutation.mutate(cartProduct.id);
  };

  return (
    <article className="cart__product">
      <div className="cart__product__img">
        <img
          src={cartProduct.product.images[0].url}
          alt={cartProduct.product.title}
        />
      </div>

      <div className="cart__product__detail">
        <header className="cart__product__header">
          <h4 className="cart__product__title">{cartProduct.product.title}</h4>
          <button
            className="cart__product__btn"
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
          >
            <i className="bx bx-trash"></i>
          </button>
        </header>

        <div>
          <div className="cart__product__controls">
            <button className="cart__product__btn" onClick={decrement}>
              -
            </button>
            <span>{quantity}</span>
            <button className="cart__product__btn" onClick={increment}>
              +
            </button>
          </div>

          {initialQuantity === quantity && (
            <button onClick={handleUpdate} disabled={isLoading}>
              Update Cart
            </button>
          )}
        </div>

        <div>
          <h4>total</h4>
          <p>
            <em>{initialQuantity * price}</em>
          </p>
        </div>
      </div>
    </article>
  );
};

export default CartProduct;
