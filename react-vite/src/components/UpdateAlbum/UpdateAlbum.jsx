import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateAlbum.css";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { fetchUpdateAlbum, fetchCurrUserAlbums } from "../../redux/albumReducer";
import "./UpdateAlbum.css"
function UpdateAlbum() {
  const { album_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const usersAlbums = useSelector((state) => state.album);

  // Find the album to edit by its ID
  const editAlbum = Object.values(usersAlbums).find(item => item.id === parseInt(album_id));

  // Initialize state with album data if it exists
  const [band, setBand] = useState(editAlbum ? editAlbum.band : "");
  const [title, setTitle] = useState(editAlbum ? editAlbum.title : "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    editAlbum ? editAlbum.cover_image_url : ""
  );
  const [description, setDescription] = useState(
    editAlbum ? editAlbum.description : ""
  );
  const [producer, setProducer] = useState(editAlbum ? editAlbum.producer : "");
  const [genre, setGenre] = useState(editAlbum ? editAlbum.genre : "");
  const [tags, setTags] = useState(editAlbum ? editAlbum.tags : "");
  const [errors, setErrors] = useState({});

  const updateBand = (e) => setBand(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateCoverImage = (e) => setCoverImageUrl(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGenre = (e) => setGenre(e.target.value);
  const updateTags = (e) => setTags(e.target.value);
  const updateProducer = (e) => setProducer(e.target.value);

  useEffect(() => {
    if (user) {
      dispatch(fetchCurrUserAlbums()); // Fetch the user's albums on mount
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Update form fields when the album is loaded from the Redux store
    if (editAlbum) {
        setBand(editAlbum.band || ""); // Use an empty string as fallback
        setTitle(editAlbum.title || "");
        setCoverImageUrl(editAlbum.cover_image_url || "");
        setDescription(editAlbum.description || "");
        setProducer(editAlbum.producer || "");
        setGenre(editAlbum.genre || "");
        setTags(editAlbum.tags || "");
      }
    }, [editAlbum]);

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
    const payload = {
      id: editAlbum.id,
      user_id: editAlbum.user_id,
      band,
      title,
      cover_image_url: coverImageUrl,
      description,
      producer,
      genre,
      tags,
    };
    try {
      const updatedAlbum = await dispatch(fetchUpdateAlbum(payload));
      // console.log({ updatedAlbum });
      if (updatedAlbum) {
        navigate(`/albums/${updatedAlbum.id}/products/edit`);
      }
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

  if (!editAlbum) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Update Album</h1>
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>What&apos;s your album&apos;s new name?</h2>
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

          <div className="button-group">
            <button type="submit" className="form-button">
              Update Album
            </button>
            <NavLink to={`/albums/${album_id}/edit-products`}>
            <button type="submit" className="form-button">
              Update Products
            </button>
            </NavLink>
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

export default UpdateAlbum;
