import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  UpdateProduct,
} from "../../actions/productActions";
import HashLoader from "react-spinners/HashLoader";
import { Input, InputGroup } from "@chakra-ui/input";
import { Helmet } from "react-helmet";

import { Box, Checkbox, Stack, Textarea, VStack } from "@chakra-ui/react";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import "./Editproduct.css";
const Editproduct = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [countInStock, setcountInStock] = useState(0);
  const [Url1, setUrl1] = useState("");
  const [Url2, setUrl2] = useState("");
  const [Url3, setUrl3] = useState("");

  const [Images, setImages] = useState([]);
  const [sizes, setsizes] = useState([]);
  const [category, setcategory] = useState([]);
  const [Menselected, setMenselected] = useState(false);
  const [Womenselected, setWomenselected] = useState(false);
  const [Bagselected, setBagselected] = useState(false);
  const [Watchesselected, setWatchesselected] = useState(false);
  const [Shoesselected, setShoesselected] = useState(false);
  const [Jacketselected, setJacketselected] = useState(false);

  const [Sselected, setSselected] = useState(false);
  const [Mselected, setMselected] = useState(false);
  const [Lselected, setLselected] = useState(false);
  const [XLselected, setXLselected] = useState(false);

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);

  const {
    loading: lodingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setprice(product.price);
        setdescription(product.description);
        setUrl1(product.images[0]);
        setUrl2(product.images[1]);
        setUrl3(product.images[2]);

        setcountInStock(product.countInStock);
      }
    }

    return () => {};
  }, [dispatch, productId, history, product, successUpdate]);

  const submitHandler = (e) => {
    Images.push(Url1);
    Images.push(Url2);
    Images.push(Url3);

    e.preventDefault();
    dispatch(
      UpdateProduct({
        _id: productId,
        name,
        price,
        Images,

        countInStock,
        description,
      })
    );
  };

  return (
    <div className="Edituser">
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      {error && <h4>{error}</h4>}
      {/* {successUpdate && <h4>Profile Updated</h4>} */}
      {loading || lodingUpdate ? (
        <div className="loading">
          <HashLoader color={"#1e1e2c"} loading={lodingUpdate} size={40} />
        </div>
      ) : errorUpdate ? (
        <h4>{errorUpdate}</h4>
      ) : (
        <div>
          <h4 className="Edittitle">Edit Product :</h4>
          <div className="formedit">
            <form onSubmit={submitHandler}>
              <div>
                <div className="input-div zz">
                  Name :
                  <div className="div">
                    <InputGroup>
                      <Input
                        type="text"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                </div>

                <div className="input-div one">
                  Price :
                  <div className="div">
                    <InputGroup>
                      <Input
                        type="text"
                        value={price}
                        placeholder="Enter price"
                        onChange={(e) => setprice(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="input-div one">
                  countInStock :
                  <div className="div">
                    <InputGroup>
                      <Input
                        type="text"
                        value={countInStock}
                        placeholder="Enter price"
                        onChange={(e) => setcountInStock(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                </div>

                <div className="input-div pass">
                  <div className="div"></div>
                </div>

                <div className="input-div pass">
                  Urls for images:
                  <div className="div urls">
                    <Box>
                      <Stack direction="column">
                        <Input
                          type="text"
                          value={Url1}
                          onChange={(e) => {
                            setUrl1(e.target.value);
                          }}
                        />
                        <Input
                          type="text"
                          value={Url2}
                          onChange={(e) => {
                            setUrl2(e.target.value);
                          }}
                        />
                        <Input
                          type="text"
                          value={Url3}
                          onChange={(e) => {
                            setUrl3(e.target.value);
                          }}
                        />
                      </Stack>
                    </Box>
                    {/* <Input type= 'text' value={category} onChange = {(e)=>{setcategory((e.target.value).split(' ')) ; }}/> */}
                  </div>
                </div>
                {message && <h4 className="Message">{message}</h4>}
                <input
                  type="submit"
                  className="btna2 postionbtnupdate"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editproduct;
