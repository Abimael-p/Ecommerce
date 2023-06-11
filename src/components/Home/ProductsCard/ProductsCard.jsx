import { Link, useNavigate } from "react-router-dom";
import { useAddProductToCart } from "../../../Hooks/query/useAddProducttoCart";
import { useSelector } from "react-redux";
import { useCart } from "../../../Hooks/query/useCart";
import "./ProductsCard.css";

const ProductsCard = ({ product }) => {
  const { mutate } = useAddProductToCart();
  const { data, isLoading } = useCart();
  const isLogged = useSelector((store) => store.auth.isLoggedIn);
  const navigate = useNavigate();

  const isProductInCart = data?.some(
    (cartProduct) => cartProduct.productId === product.id
  );

  const isAddVisible = !isLogged || !isProductInCart;

  const handleAdd = (e) => {
    e.preventDefault();

    if (!isLogged) navigate("/login");
    else mutate({ quantity: 1, productId: product.id });
  };

  return (
    <Link className="link__productId__link__l" to={"/product/" + product.id}>
      <article className="product__cart__home_">
        <header className="product__cart__header">
          <div className="product__cart__container__img">
            <img
              src={product.images[0].url}
              alt={product.title + "image 1"}
              className="product__card__img_ product__cart__container__img--visible"
            />
            <img
              src={product.images[1].url}
              alt={product.title + "image 2"}
              className="product__card__img_ product__cart__container__img--hidden"
            />
          </div>
          <h3 className="product__cart__paragraph_">{product.brand}</h3>
          <h2 className="product__title__card_">{product.title}</h2>
        </header>

        <section className="product__cart__body_">
          <h3 className="product__price_">Price</h3>
          <p className="product__cart__paragraph_">
            <em>{product.price}</em>
          </p>
        </section>

        {isAddVisible && (
          <button
            className="product__cart__btn_"
            onClick={handleAdd}
            disabled={isLoading}
          >
            <i className="bx bxs-cart-add"></i>
          </button>
        )}

        {!isAddVisible && (
          <p className="add__visible_">
            You already have this product in your cart
          </p>
        )}
      </article>
    </Link>
  );
};

export default ProductsCard;
