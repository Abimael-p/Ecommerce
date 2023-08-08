import { useDeleteProductFromCart } from "../../../Hooks/query/useDeleteProductFromCart";
import { useUpdateCart } from "../../../Hooks/query/useUpdateCart";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./CartProduct.css";

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
    if (!islogged) {
      mutate({ carProductId: cartProduct.id, newQuantity: quantity });
      setQuantity(quantity);
    }
  };

  const handleDelete = () => {
    if (!deleteMutation.isLoading) deleteMutation.mutate(cartProduct.id);
  };

  return (
    <article className="cart__product">
      <div className="cart__product__img__img">
        <img
          src={cartProduct.product.images?.[0].url}
          alt={cartProduct.product.title}
        />
      </div>

      <div className="cart__product__detail__cart">
        <h4 className="cart__product__title">{cartProduct.product.title}</h4>

        <div className="quantity__container">
          <div className="cart__product__controls">
            <button
              className="cart__product__btn__quantity"
              onClick={decrement}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="cart__product__btn__quantity"
              onClick={increment}
            >
              +
            </button>
          </div>

          {initialQuantity !== quantity && (
            <button
              className="update__cart"
              onClick={handleUpdate}
              disabled={isLoading}
            >
              Update Cart
            </button>
          )}
        </div>

        <div className="container__total__buy">
          <div>
            <h4 className="total__buy">total</h4>
            <p>
              <em className="total__price">${initialQuantity * price}</em>
            </p>
          </div>
          <button
            className="cart__product__btn"
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
          >
            <i className="bx bx-trash"></i>
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartProduct;
