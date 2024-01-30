import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchProducts } from "../../redux/productsSlice";
import {
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsHeart,
  BsCartPlusFill,
} from "react-icons/bs";
import "./style.css";
import { addToCart } from "../../redux/productsSlice";

export default function Product(params) {
  const dispatch = useDispatch();
  let { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(true);
  const [activeProduct, setProduct] = useState({
    productName: "name",
  });
  const products = useSelector((state) => state.products.value);
  const dbLoading = useSelector((state) => state.products.loading);

  const getProduct = useCallback(async () => {
    const res = await products.find((item) => String(item.id) === productId);
    setProduct(res);
    setLoading(false);
    res && setHasError(false);
  }, [products, productId]);

  useEffect(() => {
    products.length > 0 ? getProduct() : dispatch(fetchProducts());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [products.length, dispatch, getProduct]);

  const myStars = (starRating) => {
    let theStars = [];
    let lostStars = 5;
    for (let i = 0; i < Math.floor(starRating); i++) {
      theStars.push(<BsStarFill />);
      lostStars--;
    }
    if ((starRating * 2) % 2 === 1) {
      theStars.push(<BsStarHalf />);
      lostStars--;
    }
    for (let n = 0; n < lostStars; n++) {
      theStars.push(<BsStar />);
    }
    return theStars;
  };

  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  const handleAddToCart = (onCart) => {
    try {
      dispatch(addToCart(onCart));
      alert("Sepete Eklendi");
    } catch (error) {
      alert("Sorun");
    }
  };

  return (
    <div className="container">
      {hasError ? (
        "Error"
      ) : loading ? (
        "Loading..."
      ) : dbLoading ? (
        "Loading..."
      ) : (
        <>
          <section id="product">
            <div id="productImages">
              <img
                src={activeProduct.imageURL}
                alt={activeProduct.productName}
              />
            </div>
            <div id="productContent">
              <div id="productContentTop">
                <div>
                  <div>{activeProduct.brand}</div>
                  <h2>{activeProduct.productName}</h2>
                </div>
                <div id="productRating">
                  <div id="productStars">
                    <div>{activeProduct.stars.toFixed(1)}</div>
                    <div id="starIcons">
                      {myStars(Math.round(activeProduct.stars * 2) / 2).map(
                        (item) => {
                          return item;
                        }
                      )}
                    </div>
                  </div>
                  <div id="reviewCount">
                    {activeProduct.reviewCount} değerlendirme
                  </div>
                </div>
              </div>
              <div id="productDescContainer">
                <span id="productDesc">{activeProduct.description}</span>
                <a
                  href="#description"
                  onClick={(e) => openCity(e, "description")}
                >
                  See More
                </a>
              </div>
              <div id="productOptions">
                {activeProduct.options.map((item) => {
                  return (
                    <div className="productOption">
                      <h3>{item.optionName}</h3>
                      <div>
                        {item.optionValues.map((option) => {
                          return <button>{option}</button>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div id="productPrices">
                <div id="productOldPrice">₺{activeProduct.oldPrice}</div>
                <div id="productCurrentPrice">
                  ₺{activeProduct.currentPrice}
                </div>
              </div>
              <div id="productButtons">
                <button
                  id="productAddToCart"
                  onClick={() => {
                    handleAddToCart(activeProduct.id);
                  }}
                >
                  <BsCartPlusFill /> Sepete Ekle
                </button>
                <button id="productAddToFavorite" className="tooltip tooltipUp">
                  <BsHeart />
                </button>
              </div>
            </div>
          </section>
          <section style={{ paddingInline: "1rem", paddingBlock: 0 }}>
            <div className="tab">
              <button
                className="tablinks active"
                onClick={(e) => openCity(e, "description")}
              >
                Ürün Açıklamaları
              </button>
              <button
                className="tablinks"
                onClick={(event) => openCity(event, "Paris")}
              >
                Ürün Yorumları
              </button>
              <button
                className="tablinks"
                onClick={(event) => openCity(event, "Tokyo")}
              >
                Ödeme Seçenekleri
              </button>
            </div>

            <div
              id="description"
              className="tabcontent active"
              style={{ display: "block" }}
            >
              <h3>{activeProduct.brand + " " + activeProduct.productName}</h3>
              <br />
              <p>{activeProduct.description}</p>
            </div>

            <div id="Paris" className="tabcontent">
              <h3>Hata</h3>
              <br />
              <p>Ürün Yorumları Yüklenemedi.</p>
            </div>

            <div id="Tokyo" className="tabcontent">
              <h3>Hata</h3>
              <br />
              <p>Ödeme Seçenekleri Yüklenemedi</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
