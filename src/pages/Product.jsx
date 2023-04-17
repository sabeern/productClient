import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../config/BaseUrl";

function Product() {
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
  });
  const [productList, setProductList] = useState([]);
  const getProducts = async () => {
    const token = localStorage.getItem("userToken");
    const headers = { "X-Custom-Header": `${token}` };
    try {
      const res = await instance.get("/product/getProduct", { headers });
      setProductList(res.data.products);
    } catch (err) {
      console.log("product fetching failed");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const [err, setErorr] = useState();
  const changeProduct = ({ currentTarget: input }) => {
    setProduct({ ...product, [input.name]: input.value });
  };
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("userToken");
      const headers = { "X-Custom-Header": `${token}` };
      await instance.post("/product/deleteProduct", { id }, { headers });
      getProducts();
    } catch (err) {
      console.log("operation failed");
    }
  };
  const addProduct = async () => {
    const token = localStorage.getItem("userToken");
    const headers = { "X-Custom-Header": `${token}` };
    try {
      await instance.post("/product/addProduct", product, { headers });
      getProducts();
      setProduct({
        productName: "",
        productPrice: "",
      });
    } catch (err) {
      setErorr("Product adding failed");
    }
  };
  return (
    <>
      <h1>Product Management</h1>
      <table>
        <tr>
          <td>Product Name</td>
          <td>
            <input
              type="text"
              name="productName"
              onChange={changeProduct}
              value={product.productName}
            />
          </td>
        </tr>
        <tr>
          <td>Product Price</td>
          <td>
            <input
              type="number"
              name="productPrice"
              onChange={changeProduct}
              value={product.productPrice}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button onClick={addProduct}>Add</button>
          </td>
        </tr>
      </table>
      <h2>Product List</h2>
      {productList.length < 1 ? (
        <p>No products added</p>
      ) : (
        <table>
          <tr>
            <th>Product Name</th>
            <th>Produt Price</th>
            <th></th>
            <th></th>
          </tr>
          {productList.map((val, index) => {
            return (
              <tr key={index}>
                <td>{val.productName}</td>
                <td>{val.productPrice}</td>
                <td>
                  <a
                    onClick={() => deleteProduct(val._id)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Delete
                  </a>
                </td>
                <td></td>
              </tr>
            );
          })}
        </table>
      )}
    </>
  );
}

export default Product;
