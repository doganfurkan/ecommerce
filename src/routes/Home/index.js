import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import "./style.css";
import { BsChevronRight } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const productsValue = useSelector((state) => state.products.value);
  const [countDown,setCountDown] = useState("01 Gün 13 Saat 28 Dakika 54 Saniye")

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let tekrar =
      document.body.offsetWidth /
      document.getElementById("tekrarla").offsetWidth;
    for (let i = 0; i < Math.ceil(tekrar) - 1; i++) {
      let sp = document.createElement("span");
      sp.innerHTML = " ne ararsan buradan alırsın";
      document.getElementById("slogan").appendChild(sp);
    }
  }, []);

  useEffect(() => {
    const countDownDate = new Date().getTime() + 134935000;
    setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
        
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountDown(`${days < 10 ? "0" + days : days} Gün ${hours < 10 ? "0" + hours : hours} Saat ${minutes < 10 ? "0" + minutes : minutes} Dakika ${seconds < 10 ? "0" + seconds : seconds} Saniye`)
  },1000)
},[])

  return (
    <>
      <section id="entrance">
        <div className="container">
          <div id="entranceCard">
            <div id="entranceCardImage">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
                alt="shoe"
                fetchpriority="high"
              />
            </div>
            <div id="entranceCardContent">
              <header>
                <h2>
                  750 TL ve üzeri taksitli Giyim ve Ayakkabı alışverişlerinize
                  +3 taksit fırsatını kaçırmayın
                </h2>
                <ul>
                  <li>Kampanyaya katılım için son gün 31 Ocak 2024'tür.</li>
                  <li>Kampanya yalnızca seçili ürünlerde geçerlidir.</li>
                </ul>
              </header>
              <a href="#kampanya">Seçili Ürünleri Gör</a>
            </div>
          </div>
        </div>

        <span></span>
        <span></span>
        <span></span>
      </section>

      <section id="slogan">
        <span id="tekrarla"> ne ararsan buradan alırsın</span>
      </section>

      <section id="onerilenler">
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

      <section id="lansman">
        <div className="container">
          <img
            src="https://motorolauk.vtexassets.com/arquivos/ids/159186-800-auto?width=800&height=auto&aspect=true"
            alt="lansman"
          />
          <div>
            <p>
              Lansmana özel fırsatlarla yeni bir telefona sahip olma şansını
              kaçırma
            </p>
            <span id="geriSayim">{countDown}</span>
          </div>
        </div>
      </section>

      <section id="yeni">
        <div className="container">
          <header>
            <h2 className="sectionHeader">yeni</h2>
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
    </>
  );
}
