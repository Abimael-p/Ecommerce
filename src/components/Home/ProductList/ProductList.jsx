import { useProducts } from "../../../Hooks/query/useProducts";
import ProductsCard from "../ProductsCard/ProductsCard";
import "./ProductList.css";

const ProductList = ({ categories, title, excludeIds = [] }) => {
  const { data, isLoading, isError } = useProducts(categories, title);

  if (isLoading) return <p className="loading__product">Loading products...</p>;
  if (isError)
    return <p className="loading__product">Opps, Something went wrong</p>;

  return (
    <ul className="list__product">
      {data
        .filter((product) => !excludeIds.includes(product.id))
        .map((product) => (
          <li className="cart__product" key={product.id}>
            <ProductsCard product={product} />
          </li>
        ))}
    </ul>
  );
};

export default ProductList;
