import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { listProductDetails } from "../../actions/productActions";

import {
  FaWhatsapp,
  IoLogoFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillShop,
  MdDoNotDisturb,
} from "react-icons/all";
import { Image, Select, Button } from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";

import "./product.css";
//import { Link } from "react-router-dom";
import { Link } from "@chakra-ui/react";
const Productpage = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const imgs = document.querySelectorAll(".img-select a");
  const imgShowcase = useRef(null);
  const imgBtns = [...imgs];
  let imgId = 1;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;
    imgShowcase.current.style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const UrlContent = () => {
    const currentroute = encodeURIComponent(
      "I Would like to order: " + `${window.location.href}`
    );
    return currentroute;
  };
  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className="productpage">
        {loading ? (
          <div className="loading-product">
            <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
          </div>
        ) : error ? (
          <h2>{error} </h2>
        ) : (
          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-display">
                  <div ref={imgShowcase} className="img-showcase">
                    {product.images.map((i) => (
                      <Image src={i} />
                    ))}
                  </div>
                </div>
                <div className="img-select">
                  <div className="img-item">
                    <a href="#" data-id="1">
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        src={product.images[0]}
                        alt="Car image"
                      />
                    </a>
                  </div>
                  <div className="img-item">
                    <a href="#" data-id="2">
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        src={product.images[1]}
                        alt="Car image"
                      />
                    </a>
                  </div>
                  <div className="img-item">
                    <a href="#" data-id="3">
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        src={product.images[2]}
                        alt="Car image"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="product-content">
                <h2 className="product-title">{product.name} </h2>

                <div className="product-detail">
                  <h2>About this Car: </h2>
                  <p>{product.description}</p>

                  <ul>
                    <li>
                      Status:{" "}
                      <span>
                        {product.countInStock > 0 ? "ìn stock" : "Out Of Stock"}
                      </span>
                    </li>

                    <div>
                      <ul>
                        {" "}
                        <li>Qty :</li>
                        {product.countInStock > 0 ? (
                          <Select
                            as="select"
                            size="md"
                            maxW={20}
                            value={qty}
                            className="select-product"
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Select>
                        ) : (
                          <span style={{ display: "flex" }}>
                            <MdDoNotDisturb size="26" /> OUT OF STOCK{" "}
                          </span>
                        )}
                      </ul>
                    </div>
                  </ul>
                </div>

                <div className="purchase-info">
                  <Link
                    className="btn-shop"
                    href={`https://api.whatsapp.com/send?phone=923479313463&text=${UrlContent()}`}
                  >
                    <FaWhatsapp style={{ margin: "4px" }} />
                    Order on Whatsapp
                  </Link>
                </div>

                <div className="social-links">
                  <p>Share On: </p>
                  <Link className="social" href="#">
                    <i>
                      {" "}
                      <IoLogoFacebook size="20" />
                    </i>
                  </Link>
                  <Link className="social" href="#">
                    <i>
                      <AiFillTwitterCircle size="20" />
                    </i>
                  </Link>
                  <Link className="social" href="#">
                    <i>
                      <AiFillInstagram size="20" />{" "}
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Productpage;
