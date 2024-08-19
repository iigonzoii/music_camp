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
    { type: "", price: "", amount: "" },
  ]);

  const updateProductType = (index, field, value) => {
    const updatedProductTypes = [...productTypes];

    if (field === 'amount') {
      updatedProductTypes[index][field] = value;
    } else if (field === 'price') {
      updatedProductTypes[index][field] = value;
    } else {
      updatedProductTypes[index][field] = value;
    }

    setProductTypes(updatedProductTypes);
  };

  const addProductType = () => {
    if (productTypes.length < 4) {
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

      // Check if there are no products
      if (productTypes.length === 0) {
        setErrors({ form: 'You must have at least one product type.' });
        return;
      }

    const newErrors = {};

    // Validate each product type
    productTypes.forEach((productType, index) => {
      if (!productType.type) {
        newErrors[`type-${index}`] = "Product type is required";
      }
      if (!productType.price || productType.price <= 0) {
        newErrors[`price-${index}`] = "Price must be a positive number";
      }
      if (!productType.amount || productType.amount <= 0) {
        newErrors[`amount-${index}`] = "Quantity must be a positive number";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare the product types data from state
    const formattedProductTypes = productTypes.map((pt) => ({
      type: pt.type,
      price: parseFloat(pt.price), // Use parseFloat to allow decimal values
      amount: parseInt(pt.amount, 10),
    }));

    const payload = {
      album_id: parseInt(album_id),
      product_types: formattedProductTypes, // Include product types in the payload
    };

    try {
      const newProducts = await dispatch(createProducts(payload.album_id, payload));

      if (newProducts) {
        navigate(`/albums/${album_id}`);
      }
    } catch (err) {
      console.error({ err });
      setErrors({ general: "An error occurred while adding products." });
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
                <option value="">Select Product Type</option>
                <option value="CD">CD</option>
                <option value="Vinyl">Vinyl</option>
                <option value="Cassette">Cassette</option>
                <option value="Digital">Digital</option>
              </select>
              {errors[`type-${index}`] && <p className="error">{errors[`type-${index}`]}</p>}
              <span>$</span>
              <input
                value={productType.price}
                onChange={(e) =>
                  updateProductType(index, "price", e.target.value)
                }
                placeholder="Price"
                className="input-field"
              />
              {errors[`price-${index}`] && <p className="error">{errors[`price-${index}`]}</p>}
              <input
                value={productType.amount}
                onChange={(e) =>
                  updateProductType(index, "amount", e.target.value)
                }
                placeholder="Quantity"
                className="input-field"
              />
              {errors[`amount-${index}`] && <p className="error">{errors[`amount-${index}`]}</p>}
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
          {errors.general && <p className="error">{errors.general}</p>}
          {errors.form && <p className="error">{errors.form}</p>}        </form>
      </section>
    </>
  );
}

export default AddProducts;
