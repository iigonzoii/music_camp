import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createProducts } from "../../redux/albumReducer";
import "./AddProducts.css";

function AddProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { album_id } = useParams();
  const user = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState({});
  const [productTypes, setProductTypes] = useState([
    { type: "CD", price: "", amount: "" },
  ]);

  const updateProductType = (index, field, value) => {
    const updatedProductTypes = [...productTypes];

    if (field === 'amount') {
      updatedProductTypes[index][field] = parseInt(value, 10);
    } else if (field === 'price') {
      updatedProductTypes[index][field] = parseFloat(value);
    } else {
      updatedProductTypes[index][field] = value;
    }

    setProductTypes(updatedProductTypes);
  };

  const addProductType = () => {
    if(productTypes.length < 4){
        setProductTypes([...productTypes, { type: "", price: "", amount: "" }]);
    }
  };

  const removeProductType = (index) => {
    const updatedProductTypes = productTypes.filter((_, i) => i !== index);
    setProductTypes(updatedProductTypes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare the product types data from state
    const formattedProductTypes = productTypes.map((pt) => ({
      type: pt.type,
      price: pt.price,
      amount: pt.amount,
    }));

    const payload = {
      album_id: parseInt(album_id),
      product_types: formattedProductTypes, // Include product types in the payload
    };
    let newProducts;
    try {
      newProducts = await dispatch(createProducts(payload.album_id, payload));

      // console.log({ newProducts });
        if (newProducts) {
          navigate(`/albums/${album_id}`);
        }
    } catch (err) {
      console.error({ err });
    }
  };

  if (!user) {
    return <p>Please Login</p>;
  }

  return (
    <>
      <h1>{"Add Products"}</h1>
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Product Types</h2>
          {productTypes.map((productType, index) => (
            <div key={index} className="price-section">
              <select
                value={productType.type}
                onChange={(e) =>
                  updateProductType(index, "type", e.target.value)
                }
                className="input-field"
              >
                <option value="CD">CD</option>
                <option value="Vinyl">Vinyl</option>
                <option value="Cassette">Cassette</option>
                <option value="Digital">Digital</option>
              </select>
              <span>$</span>
              <input
                value={productType.price}
                onChange={(e) =>
                  updateProductType(index, "price", e.target.value)
                }
                placeholder="Price"
                className="input-field"
              />
              <input
                value={productType.amount}
                onChange={(e) =>
                  updateProductType(index, "amount", e.target.value)
                }
                placeholder="Quantity"
                className="input-field"
              />
              <button type="button" onClick={() => removeProductType(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addProductType}>
            Add Another Product Type
          </button>

          <div className="button-group">
            <button type="submit" className="form-button">
              {"Add Products"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddProducts;
