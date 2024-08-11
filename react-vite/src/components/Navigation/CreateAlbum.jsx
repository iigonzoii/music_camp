import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateAlbum.css";
import { useNavigate } from "react-router-dom";
import { createAlbum, updateAlbum } from "../../redux/albumReducer";


function CreateAlbum({ album }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [band, setBand] = useState(album ? album.band : "");
  const [title, setTitle] = useState(album ? album.title : "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    album ? album.coverImageUrl : ""
  );
  const [description, setDescription] = useState(
    album ? album.description : ""
  );
  const [producer, setProducer] = useState(album ? album.producer : "");
  const [genre, setGenre] = useState(album ? album.genre : "");
  const [tags, setTags] = useState(album ? album.tags : "");
  const [errors, setErrors] = useState({});
  const [productTypes, setProductTypes] = useState([
    { type: "", price: "", amount: "" },
  ]);

  const updateBand = (e) => setBand(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateCoverImage = (e) => setCoverImageUrl(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGenre = (e) => setGenre(e.target.value);
  const updateTags = (e) => setTags(e.target.value);
  const updateProducer = (e) => setProducer(e.target.value)

  const updateProductType = (index, field, value) => {
    const updatedProductTypes = [...productTypes];
    updatedProductTypes[index][field] = value;
    setProductTypes(updatedProductTypes);
  };

  const addProductType = () => {
    setProductTypes([...productTypes, { type: "", price: "", amount: "" }]);
  };

  const removeProductType = (index) => {
    const updatedProductTypes = productTypes.filter((_, i) => i !== index);
    setProductTypes(updatedProductTypes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!band) newErrors.band = "Band is required";
    if (!title) newErrors.title = "Title is required";
    if (!coverImageUrl) newErrors.coverImageUrl = "Cover Image is required";
    if (!description) newErrors.description = "Description is required";
    if (!producer) newErrors.producer = "Producer is required";
    if (!genre) newErrors.genre = "Genre is required";
    if (description.length < 10) {
      newErrors.description = "Description of 30 characters is required";
    }

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
        user_id: user.id,
        band,
        title,
        coverImageUrl,
        description,
        producer,
        genre,
        tags,
        product_types: formattedProductTypes, // Include product types in the payload
      };


    let newAlbum;
    try {
      if (album) {
        payload.id = album.id;
        newAlbum = await dispatch(updateAlbum(album.id, payload));
      } else {
        newAlbum = await dispatch(createAlbum(payload));
      }
      console.log({ newAlbum });
    //   if (newAlbum) {
    //     navigate(`/albums/${newAlbum.id}`);
    //   }
    } catch (err) {
      const data = await err.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  if (!user) {
    return <p>Please Login</p>;
  }

  return (
    <>
      <h1>{album ? "Update album" : "Create New album"}</h1>
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Whats your new album name?</h2>
          <input
            value={band}
            onChange={updateBand}
            placeholder="Band name"
            className="input-field"
          />
          {errors.band && <p className="error-message">{errors.band}</p>}
          <input
            value={title}
            onChange={updateTitle}
            placeholder="Title"
            className="input-field"
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
          <input
            value={coverImageUrl}
            onChange={updateCoverImage}
            placeholder="Cover Image"
            className="input-field"
          />
          {errors.coverImageUrl && (
            <p className="error-message">{errors.coverImageUrl}</p>
          )}
          <input
            value={producer}
            onChange={updateProducer}
            placeholder="Producer"
            className="input-field"
          />
          {errors.producer && <p className="error-message">{errors.producer}</p>}

          <input
            value={genre}
            onChange={updateGenre}
            placeholder="Genre"
            className="input-field"
          />
          {errors.genre && <p className="error-message">{errors.genre}</p>}
          <input
            value={tags}
            onChange={updateTags}
            placeholder="Tags"
            className="input-field"
          />
          {errors.tags && <p className="error-message">{errors.tags}</p>}

          <h2>Describe your album</h2>
          <textarea
            value={description}
            onChange={updateDescription}
            placeholder="Description"
            className="textarea-field"
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}

          <h2>Product Types</h2>
          {productTypes.map((productType, index) => (
            <div key={index} className="price-section">
              <input
                value={productType.type}
                onChange={(e) =>
                  updateProductType(index, "type", e.target.value)
                }
                placeholder={`Type (e.g., Digital, Vinyl)`}
                className="input-field"
              />
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
              {album ? "Update Album" : "Create new Album"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="form-button cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateAlbum;
