import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";
import axios from "axios";
import { getProducts } from "./Method/Method";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { useHistory,useNavigate,useLocation } from 'react-router-dom'

function HomeScreen() {
  let navigate = useNavigate();
  let location=useLocation();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page,pages } = productList;

  let keyword=location.search
  console.log('keyword: ', keyword);

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch,keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel/>}
      
      <h1>Latest Products</h1>
      {loading ? (
       <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
        <Row>
          {products?.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword}/>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
