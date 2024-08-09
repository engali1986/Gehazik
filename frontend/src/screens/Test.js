import React, { useState, useEffect } from "react";

const Test = () => {
  const [products, setProducts] = useState([]);

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

  const Clicko = (e) => {
    e.stopPropagation();
    console.log("clicked");
    setTimeout(() => {
      Clicko(e);
    }, 5000);
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
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                border: "1px solid black",
              }}
            >
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(e.target.innerText);
                }}
              >
                {product._id}
              </td>
              <td>{product.ProductTitle}</td>
              <td>
                <input
                  type="number"
                  defaultValue={product.ProductUnitPrice}
                  disabled
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={product.InStockQty}
                  disabled
                />
              </td>
              <td>{product.OrderedQty}</td>

              <td
                onClick={(e) => {
                  e.stopPropagation();
                  const parent = e.target.parentElement;
                  const children = parent.children;

                  for (let i = 0; i < children.length; i++) {
                    console.log(`Element ${i}:`, children[i]);
                    if (children[i].children.length > 0) {
                      console.log(
                        "Contains child elements:",
                        children[i].children
                      );
                      children[i].children[0].disabled = false;
                    } else {
                      console.log("No child elements");
                    }
                  }
                }}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={(e) => Clicko(e)}>hghjgh</button>
    </>
  );
};

export default Test;
