import { useSelector } from "react-redux";
import { useCart } from "../../../Hooks/query/useCart";
import { userCreatePurchases } from "../../../Hooks/query/useCrestePurchases";
import CartProduct from "../CartProduct/CartProduct";
import "./Cart.css";

const Cart = ({ isVisible }) => {
  const isLogged = useSelector(store => store.auth.isLoggedIn)
  const { data, isLoading, isError, error } = useCart();
  const createPurchasesMutation = userCreatePurchases()

  const reducer = (acc, cartProduct) =>{
  const quantity = Number(cartProduct.quantity);
  const prices = Number(cartProduct.product.price);
  
  return acc + quantity * prices;
  }
  const total = data?.reduce(reducer, 0) ?? 0;

  const toggleCart = isVisible
    ? "wrapper__cart"
    : "wrapper__cart wrapper__cart--hidden";

    const handleCheckout = () => {
      if (isLogged) createPurchasesMutation.mutate()
    }

  if (isLoading) return <p className={toggleCart}>Loading Cart...</p>;
  if (isError)
    return (
      <p className={toggleCart}>
        {error.message ?? "Cart status could not be loaded"}
      </p>
    );

  return (
    <div className={toggleCart}>
      <aside className="cart">
        <h3 className="cart__title">Shopping Cart</h3>

        {!data.length && <p className="cart__is__empty">Your cart is empty</p>}
        {Boolean(data.length) && (
          <div className="cart__container__list">
            <ul className="cart__list">
              {data.map((cartProduct) => (
                <li key={cartProduct.id}>
                  <CartProduct cartProduct={cartProduct} />
                </li>
              ))}
            </ul>

            <div>
                <p>
                  <span>Total:</span>
                  <em> $ {total.toFixed(2)}</em>
                </p>

                <button onClick={handleCheckout} disabled={createPurchasesMutation.isLoading || isLoading}>Checkout</button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Cart;
