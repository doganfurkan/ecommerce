import React, { useState } from "react";
import "./header.css";
import {
  BsSearch,
  BsGridFill,
  BsCartFill,
  BsFillPersonFill,
  BsFillHouseDoorFill,
  BsList,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const myCart = useSelector((state) => state.products.cart);

  return (
    <header id="mainHeader">
      <h1 id="logo">
        <Link to="/">
          alırsın<span>.com</span>
        </Link>
      </h1>
      <button
        id="openMenu"
        onClick={() => {
          setMobileMenu(!mobileMenu);
        }}
      >
        <BsList />
      </button>
      <nav className={mobileMenu ? "active" : ""}>
        <Link to={"/"} style={{ "--navDelay": "0s" }}>
          anasayfa{" "}
          <span>
            <BsFillHouseDoorFill />
          </span>
        </Link>
        <a
          href="#ara"
          style={{ "--navDelay": "0.1s" }}
        >
          ara{" "}
          <span>
            <BsSearch />
          </span>
        </a>
        <a href="#kategori" style={{ "--navDelay": "0.2s" }}>
          kategoriler{" "}
          <span>
            <BsGridFill />
          </span>
        </a>
        <Link to={"/cart"} style={{ "--navDelay": "0.3s" }}>
          sepetim({myCart.length})
          <span>
            <BsCartFill />
          </span>
        </Link>
        <a href="#hesap" style={{ "--navDelay": "0.4s" }}>
          hesabım{" "}
          <span>
            <BsFillPersonFill />
          </span>
        </a>
      </nav>
    </header>
  );
}
