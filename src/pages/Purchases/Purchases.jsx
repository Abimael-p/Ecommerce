import { getShoppingHistory } from "../../services/purchases/getShoppingHistory";
import PurchasesFecth from "../../components/PurchasesFecth/PurchasesFecth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import "./Purchases.css";

const Purchases = () => {
  const token = useSelector((store) => store.auth.token);
  const [buy, setBuy] = useState([]);

  useEffect(() => {
    const fecthBuy = async () => {
      try {
        const buyData = await getShoppingHistory(token);
        setBuy(buyData);
      } catch (error) {
        console.error("Error getting purchases", error);
      }
    };

    fecthBuy();
  }, [token]);

  return (
    <div>
      <h2 className="title__purchases">purchases</h2>
      <ul>
        {buy.map((Products) => (
          <div key={Products.id}>
            <PurchasesFecth product={Products} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
