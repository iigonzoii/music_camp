import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCurrUserAlbums, fetchUpdateProducts } from "../../redux/albumReducer";
import "./UpdateProducts.css"

function UpdateProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { album_id } = useParams();
  const user = useSelector((state) => state.session.user);
  const usersAlbums = useSelector((state) => state.album);

  // Find the album by album_id
  const album = usersAlbums[album_id];

  // If album has products, use them as initial state, otherwise use default state
  const initialProductTypes = album?.products?.length
    ? album.products.map((product) => ({
        type: product.type,
        price: product.price,
        amount: product.amount,
      }))
    : [{ type: "", price: "", amount: "" }];

  const [errors, setErrors] = useState({});
  const [productTypes, setProductTypes] = useState(initialProductTypes);

  useEffect(() => {
    if (user) {
      dispatch(fetchCurrUserAlbums()); // Fetch the user's albums on mount
    }
  }, [dispatch, user]);

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

    // Check if there are no products
    if (productTypes.length === 0) {
      setErrors({ form: 'You must have at least one product type.' });
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
      newProducts = await dispatch(fetchUpdateProducts(payload.album_id, payload));
      if (newProducts) {
        navigate(`/albums/${album_id}`);
      }
    } catch (err) {
      console.error({ err });
      setErrors({ form: 'An error occurred while updating the products. Please try again.' });
    }
  };

  if (!user) {
    return <p>Please Login</p>;
  }

  return (
    <>
      <h1>{"Update Products"}</h1>
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
              {"Update Products"}
            </button>
          </div>
          {errors.form && <p className="error-text">{errors.form}</p>}
        </form>
      </section>
    </>
  );
}

export default UpdateProducts;
