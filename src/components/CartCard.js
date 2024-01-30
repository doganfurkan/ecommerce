import { useDispatch } from "react-redux";
import "./cartCard.css";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { addToCart, removeFromCart } from "../redux/productsSlice";
import { Link } from "react-router-dom";

export default function CartCard({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cartCard">
      <div className="cartImg">
        <img src={item.product.imageURL} alt={item.product.productName} />
      </div>
      <div className="cartContent">
        <div className="cartProductInfo">
          <Link to={`/product/${item.product.id}`}>
            <span>{item.product.brand}</span>
            <h3>{item.product.productName}</h3>
          </Link>
        </div>
        <div className="cartProductOptions">
          {item.product.options.map((item, key) => {
            return (
              <div className="cartProductOption" key={key}>
                <span>{item.optionName}:</span>
                <div>
                  {
                    item.optionValues[
                      Math.floor(Math.random() * item.optionValues.length)
                    ]
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cartPricing">
        <div className="cartPrices">
          <div className="cartOldPrice">
          ₺{Math.floor(item.product.oldPrice)}
            {(item.product.oldPrice - Math.floor(item.product.oldPrice)).toFixed(
              2
            ) !== "0.00" && (
              <span className="cents">
                {String(
                  (
                    item.product.oldPrice - Math.floor(item.product.oldPrice)
                  ).toFixed(2)
                ).slice(1)}
              </span>
            )}
          </div>
          <div className="cartCurrentPrice">
          ₺{Math.floor(item.product.currentPrice)}
            {(item.product.currentPrice - Math.floor(item.product.currentPrice)).toFixed(
              2
            ) !== "0.00" && (
              <span className="cents">
                {String(
                  (
                    item.product.currentPrice - Math.floor(item.product.currentPrice)
                  ).toFixed(2)
                ).slice(1)}
              </span>
            )}
          </div>
        </div>
        <div className="countBox">
          <button
            className="cartCountUp"
            onClick={() => {
              dispatch(addToCart(item.product.id));
            }}
          >
            <BsChevronUp />
          </button>
          <div className="countValue">{item.count}</div>
          <button
            className="cartCountDown"
            onClick={() => {
              dispatch(removeFromCart(item.product.id));
            }}
          >
            <BsChevronDown />
          </button>
        </div>
      </div>
    </div>
  );
}
