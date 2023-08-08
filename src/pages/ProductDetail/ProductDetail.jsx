import { useNavigate, useParams } from "react-router-dom";
import { useProductById } from "../../Hooks/query/useProductById";
import ProductList from "../../components/Home/ProductList/ProductList";
import { useAddProductToCart } from "../../Hooks/query/useAddProducttoCart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCart } from "../../Hooks/query/useCart";
import { updateCart } from "../../services/Cart/updateCart";
import "./ProductDetail.css";

const ProductDetail = () => {
  const isLogged = useSelector((store) => store.auth.isLoggedIn);
  const { productId } = useParams();
  const navigate = useNavigate();
  const cartQuery = useCart();
  const token = useSelector((store) => store.auth.token);
  const { data, isLoading, isError, error } = useProductById(productId);
  const { mutate } = useAddProductToCart();

  const isProductInCart =
    cartQuery.data?.some((cartProduct) => Number(cartProduct.productId === data?.id)) ??
    false;

  const quantityInCart =
    cartQuery.data?.find((cartProduct) => Number(cartProduct.productId === productId))
      ?.quantity ?? 1;

  const [quantity, setQuantity] = useState(quantityInCart ?? 1);

  const increment = () => {
    const newQuantity = quantity + 1;
    const stockIncrement = 10;
    if (newQuantity <= stockIncrement) {
      setQuantity(newQuantity);
    }
  };

  const decrement = () => {
    const newQuantity = quantity - 1;
    const stockDecrement = 1;
    if (newQuantity >= stockDecrement) {
      setQuantity(newQuantity);
    }
  };

  const handleAddCart =  (e) => {
    if (isLogged) {
     mutate({ quantity, productId });
     e.preventDefoult()
      navigate("/login");
    }
  };

  const handleUpdate = async (carProductId,  newQuantity) => {
    if (isProductInCart == true) {
      try {
        await updateCart({
          carProductId:carProductId,
          newQuantity: newQuantity,
          token: token,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error updating cart:", error.message);
        } else {
          console.error("Error updating cart:", error);
        }
      }
    }
  }

  useEffect(() => {
    setQuantity(quantityInCart);
  }, [quantityInCart]);

  if (isLoading)
    return <p className="loading__product__detail">loading product...</p>;
  if (isError)
    return (
      <p className="loading__product__detail">
        {error.message ?? "Product could not be loaded"}
      </p>
    );

  return (
    <section className="class__container__description">
      <section className="container__description__product">
        <div className="container__img">
          <img className="image__1" src={data.images?.[0].url} alt={data.title} />
          <img src={data.images?.[1].url} alt={data.title} />
        </div>

        <div className="container__description">
          <h2>{data.title}</h2>

          <p className="description__product">{data.description}</p>
          <div className="container__brand">
            <p className="title__product__brand__price">Brand:</p>
            <h3 className="data__brand">{data.brand}</h3>
          </div>

          <div className="description__price__quantity">
            <div className="container__price__quantity">
              <h3 className="title__product__price">Price:</h3>
              <p className="price">
                <em>${data.price}</em>
              </p>
            </div>

            <div className="container__brand__quantity">
              <h3 className="title__product__price">Quantity:</h3>

              <div className="quantity__product">
                <button onClick={decrement}>-</button>
                <span>{quantity}</span>
                <button onClick={increment}>+</button>
              </div>
            </div>
          </div>

          <div className="btn__cart__container">
            {!isProductInCart && (
              <button onClick={handleAddCart} className="btn__cart">
                <i className="bx bxs-cart-add"></i>
              </button>
            )}

            {isProductInCart && (
              <button
                onClick={() => handleUpdate(productId, quantity)}
                className="update__button"
              >
                Update in cart
              </button>
            )}
          </div>
        </div>
      </section>
      <p className="products__similar">similar products</p>
      <div className="container__list__product">
        <ProductList categories={data.categoryId} excludeIds={[data.id]} />
      </div>
    </section>
  );
};

export default ProductDetail;
