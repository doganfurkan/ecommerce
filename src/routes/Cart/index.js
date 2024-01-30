import React, { useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { BsChevronRight, BsTruck, BsCart } from "react-icons/bs";
import { fetchProducts } from "../../redux/productsSlice";
import ProductCard from "../../components/ProductCard";
import CartCard from "../../components/CartCard";

export default function Cart() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const productsValue = useSelector((state) => state.products.value);
  const myCart = useSelector((state) => state.products.cart);
  const totalPrice = useSelector(state => state.products.totalPrice)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container">
      {myCart.length <= 0 ? (
          <div className="emptyCart">
            <BsCart/> Sepetinizde Ürün Bulunmamaktadır
          </div>
        ) : (
      <section id="cart">
          <div className="cartItems">
            {myCart.map((item, key) => {
              return <CartCard item={item} key={key} />;
            })}
          </div>
          <div id="cartSummary">
            <h1>Sepet Özeti</h1>
            <table id="cartTable">
              <thead>
                <tr>
                  <th>Adet</th>
                  <th>Ürün</th>
                  <th>Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {myCart.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{item.count}x</td>
                      <td>{item.product.productName}</td>
                      <td>₺{item.product.currentPrice * item.count}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td><BsTruck/></td>
                  <td>Kargo</td>
                  <td>{totalPrice < 1500 ? "₺29.99" : "₺0.00"}</td>
                </tr>
              </tbody>
            </table>
            <div id="totalPrice">
              <h3>Toplam</h3>
              <span>₺{totalPrice.toFixed(2)}</span>
            </div>
            <button className="completeShopping">Alışverişi Tamamla</button>
          </div>
        
      </section>)}

      <section id="sepetOnerilenler">
        <div className="container">
          <header>
            <h2 className="sectionHeader">önerilenler</h2>
            <a href="#tumu">
              Tümü <BsChevronRight />
            </a>
          </header>
          <div className="productCardContainer">
            {loading
              ? "Loading ..."
              : productsValue.map((item, key) => {
                  return <ProductCard product={item} key={key} />;
                })}
          </div>
        </div>
      </section>
    </div>
  );
}
