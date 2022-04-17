import React from "react";
import "./css/Home.css";
import Product from "./Product";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id="343432"
            title="The Lean Startup"
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/41Ag4WE7uyL._SX324_BO1,204,203,200_.jpg"
            rating={4}
          />
          <Product
            id="6345825"
            title="Nintendo Switch with Neon Blue and Neon Red Joy‑Con - HAC-001(-01)"
            price={299.0}
            image="https://m.media-amazon.com/images/I/61-PblYntsL._AC_SX450_.jpg"
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id="736589346"
            title="Spider-Man: No Way Home [Blu-ray]"
            price={24.96}
            image="https://m.media-amazon.com/images/I/81bFs5S0UDL._SX342_.jpg"
            rating={5}
          />
          <Product
            id="54689w048"
            title="Ailun Glass Screen Protector Compatible for iPhone 11/iPhone XR, 6.1 Inch 3 Pack Tempered Glass
Visit the Ailun Store"
            price={8.98}
            image="https://m.media-amazon.com/images/I/81MZ5D1wHpL._AC_SX679_.jpg"
            rating={3}
          />
          <Product
            id="32425"
            title="Ray_Ban New Wayfarer Sunglasses (Matte Black Frame 55mm), Matte Black Frame Solid Black G15 Lens, 55 mm"
            price={151.0}
            image="https://m.media-amazon.com/images/I/51+TKek67sL._AC_UX535_.jpg"
            rating={4}
          />
        </div>
        <div className="home__row">
          <Product
            id="589053490"
            title="Ferrero Rocher Fine Hazelnut Milk Chocolate, 42 Count, Chocolate Candy Gift Box, 18.5 oz, Perfect for Easter Gifting"
            price={18.36}
            image="https://m.media-amazon.com/images/I/91+fN2LeByL._SX679_.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
