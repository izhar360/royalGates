import React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import Empty from "../../components/Empty";
import Productoncart from "../../components/Productoncart";
import "./cartcss.css";
import { Link } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
const Cartpage = ({ match, location, history }) => {
  const { id } = match.params;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const UrlContent = () => {
    const cartitems = cartItems.map((item) => {
      return `( name: ${item.name}, quantity: ${item.qty} )`;
    });
    const items = encodeURIComponent(
      "I Would like to order: " + cartitems.toString()
    );
    return items;
  };

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartItems.length === 0 ? (
        <Empty />
      ) : (
        <div className="cartfull">
          <div className="cart">
            <h1>Your Cart : {cartItems.length}</h1>
            <div className="productsoncart">
              {cartItems.map((product) => (
                <Productoncart product={product} />
              ))}
            </div>
          </div>
          <div className="totalcart">
            <h3>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
              items) :
            </h3>
            <h3 className="totalprice">
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              $
            </h3>
            <h3>Delivery :</h3>
            <h3 className="totalprice">For free.</h3>
            <h3>Taxes :</h3>
            <h3 className="totalprice">-- --.</h3>
            <h3>Total :</h3>
            <h3 className="totalprice">
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              $
            </h3>
            <button className="checkoutbtn" disabled={cartItems.length === 0}>
              <Link
                href={`https://api.whatsapp.com/send?phone=923479313463&text=${UrlContent()}`}
              >
                Order on Whatsapp
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cartpage;
