import React, { useState, Fragment } from "react";
import "./productCard.css";
import {
  BsHeart,
  BsCartPlusFill,
  BsCartCheckFill,
  BsCartXFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/productsSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const successMessage = [<BsCartCheckFill />, "Ürün Sepete Eklenmiştir"];
  const errorMessage = [<BsCartXFill />, "Bir Sorunla Karşılaştık"];
  const [addCartSuccess, setAddCartSuccess] = useState("");
  const [productAlert, setProductAlert] = useState(successMessage);

  const handleAddToCart = (onCart) => {
    try {
      dispatch(addToCart(onCart));
      setAddCartSuccess("open");
      setProductAlert(successMessage);
    } catch (error) {
      setAddCartSuccess("open error");
      setProductAlert(errorMessage);
    }
    setTimeout(() => {
      setAddCartSuccess("");
    }, 600);
  };

  return (
    <div className={`productCard ${addCartSuccess}`}>
      <button
        className="addToFavorite tooltip tooltipDown"
        aria-label="Add to Favorite"
      >
        <BsHeart />
      </button>
      <div className="productCardImage">
        <img src={product.imageURL} alt={product.productName} />
      </div>
      <div className="productCardContent">
        <Link to={`/product/${product.id}`} className="productTitle">
          <span className="brandName">{product.brand}</span>
          <span className="productName">{product.productName}</span>
        </Link>
        <div className="oldPriceNDiscount">
          <span className="oldPrice">
          ₺{Math.floor(product.oldPrice)}
            {(product.oldPrice - Math.floor(product.oldPrice)).toFixed(
              2
            ) !== "0.00" && (
              <span className="cents">
                {String(
                  (
                    product.oldPrice - Math.floor(product.oldPrice)
                  ).toFixed(2)
                ).slice(1)}
              </span>
            )}
          </span>{" "}
          <span className="discount">
            -
            {Math.round(
              ((product.oldPrice - product.currentPrice) * 100) /
                product.oldPrice
            )}
            %
          </span>
        </div>
        <div className="priceNCartButton">
          <div className="currentPrice">
            ₺{Math.floor(product.currentPrice)}
            {(product.currentPrice - Math.floor(product.currentPrice)).toFixed(
              2
            ) !== "0.00" && (
              <span className="cents">
                {String(
                  (
                    product.currentPrice - Math.floor(product.currentPrice)
                  ).toFixed(2)
                ).slice(1)}
              </span>
            )}
          </div>
          <button
            className="addToCart tooltip tooltipUp"
            aria-label="Add to Cart"
            onClick={() => {
              handleAddToCart(product.id);
            }}
          >
            <BsCartPlusFill />
          </button>
        </div>
      </div>

      <div id="productAlert">
        {productAlert.map((item, key) => {
          return <Fragment key={key}>{item}</Fragment>;
        })}
      </div>
    </div>
  );
}
