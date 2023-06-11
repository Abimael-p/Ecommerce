import { useEffect, useState } from "react";
import "./PurchasesFecth.css";

const PurchasesFetch = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);

  const purchaseDate = new Date(product.product.updatedAt);
  const formattedPurchaseDate = purchaseDate.toLocaleString();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <p className="Loading__purchases">Loading purchases...</p>;
  }

  return (
    <section className="purchases__fetch__container">
      <h2 className="purchases__fetch__heading">Product</h2>
      <div className="purchases__fetch__content">
        <div className="purchases__fetch__image">
          <img
            className="purchases__fetch__image__img"
            src={product.product.images[0].url}
            alt={product.product.title}
          />
        </div>
        <div className="purchases__fetch__description">
          <div>
            <h3 className="purchases__fetch__info__heading">Name:</h3>
            <p className="purchases__fetch__info__text">
              {product.product.title}
            </p>
          </div>
          <div>
            <h3 className="purchases__fetch__info__heading">
              Date of purchase:
            </h3>
            <p className="purchases__fetch__info__text">
              {formattedPurchaseDate}
            </p>
          </div>
          <div>
            <h3 className="purchases__fetch__info__heading">Quantity:</h3>
            <p className="purchases__fetch__info__text">{product.quantity}</p>
          </div>
          <div>
            <h3 className="purchases__fetch__info__heading">Price:</h3>
            <p className="purchases__fetch__info__text">
              {product.product.price}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchasesFetch;
