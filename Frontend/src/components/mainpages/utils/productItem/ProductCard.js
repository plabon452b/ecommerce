import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

const ProductCard = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  return (
    <div className="product_card">
      {isAdmin && (
        <div className="input_check">
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() => handleCheck(product._id)}
          />
        </div>
      )}
      <div>
        <div>
          <div>
            <Link to={`/detail/${product._id}`}>
              {" "}
              <div className="box-up">
                <div className="info-inner">
                  <p className="p-title">{product.title}</p>
                  <p className="p-description">{product.description}</p>
                </div>
                <img className="img" src={product.images.url} alt="" />
              </div>
            </Link>

            <div className="box-down">
              <span className="price-text">${product.price}</span>
              {!isAdmin && (
                <button onClick={() => addCart(product)} className="cart-btn">
                  ADD TO CART
                </button>
              )}
              {isAdmin && (
                <Link id="btn_view" to={`/edit_product/${product._id}`}>
                  <button className="edit_btn"> edit</button>
                </Link>
              )}
              {isAdmin && (
                <button
                  onClick={() =>
                    deleteProduct(product._id, product.images.public_id)
                  }
                  className="delete_btn"
                >
                  {" "}
                  delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
