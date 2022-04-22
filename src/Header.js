import React from "react";
import amazon from "./public/amazon.png";
import "./css/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, navigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebaseConfig.js";
import { signOut } from "firebase/auth";

function Header() {
  const [{ basket, user }] = useStateValue();
  const handleAuth = () => {
    signOut(auth);
  };
  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={amazon}></img>
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text"></input>
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div onClick={handleAuth} className="header__option">
          <Link className="header__option" to={!user && "/login"}>
            <span className="header__optionLineOne">
              Hello
              {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </Link>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
