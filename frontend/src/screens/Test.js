import React, { useState, useEffect } from "react";

const Test = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      const data = [
        {
          _id: "66b4ff04a2398562c4fb96c3",
          ProductTitle: "dadsas",
          ProductUnitPrice: 1,
          InStockQty: 1,
          OrderedQty: 0,
        },
        {
          _id: "66b4ff27a2398562c4fb96c4",
          ProductTitle: "dadsas",
          ProductUnitPrice: 1,
          InStockQty: 1,
          OrderedQty: 0,
        },
        {
          _id: "66b4ff49a2398562c4fb96c5",
          ProductTitle: "dadsas",
          ProductUnitPrice: 1,
          InStockQty: 1,
          OrderedQty: 0,
        },
      ];

      setProducts(data);
    };

    fetchData();
  }, []);

  const handleEditClick = (productId) => {
    setEditProductId(productId);
  };

  const handleUpdateClick = (productId) => {
    console.log("Update");

    // const updatedProducts = products.map((product) => {
    //   if (product._id === productId) {
    //     const parent = document.querySelector(`tr[data-id='${productId}']`);
    //     const inputs = parent.querySelectorAll("input[type='number']");
    //     const updatedProduct = {
    //       ...product,
    //       ProductUnitPrice: parseFloat(inputs[0].value),
    //       InStockQty: parseFloat(inputs[1].value),
    //     };
    //     return updatedProduct;
    //   }
    //   return product;
    // });
    // setProducts(updatedProducts);
    // setEditProductId(null);
  };

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Title</th>
            <th>Unit Price</th>
            <th>In Stock Quantity</th>
            <th>Ordered Quantity</th>
            <th>Edit</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              data-id={product._id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                border: "1px solid black",
              }}
            >
              <td>{product._id}</td>
              <td>{product.ProductTitle}</td>
              <td>
                <input
                  type="number"
                  defaultValue={product.ProductUnitPrice}
                  disabled={editProductId !== product._id}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={product.InStockQty}
                  disabled={editProductId !== product._id}
                />
              </td>
              <td>{product.OrderedQty}</td>
              <td onClick={() => handleEditClick(product._id)}>Edit</td>
              <td>
                <button
                  disabled={editProductId !== product._id}
                  onClick={() => handleUpdateClick(product._id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Test;
