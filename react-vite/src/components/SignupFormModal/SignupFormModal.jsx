import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    city: '',
    state: '',
    email: '',
    username: '',
    password: '',
    bio: '',
    spotify: '',
    instagram: '',
    website: '',
    facebook: '',
    profile_img_url: '',
    banner_img_url: '',
    background_img_url: '',
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(thunkSignup(formData));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
          className="input-field"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}

        <label>
          Last Name
          <input
          className="input-field"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}

        <label>
          City
          <input
          className="input-field"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        {errors.city && <p>{errors.city}</p>}

        <label>
          State
          <input
          className="input-field"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </label>
        {errors.state && <p>{errors.state}</p>}

        <label>
          Email
          <input
          className="input-field"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label>
          Username
          <input
          className="input-field"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}

        <label>
          Password
          <input
          className="input-field"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}

        <label>
          Confirm Password
          <input
          className="input-field"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <label>
          Bio
          <input
          className="input-field"
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </label>
        {errors.bio && <p>{errors.bio}</p>}

        <label>
          Spotify
          <input
          className="input-field"
            type="text"
            name="spotify"
            value={formData.spotify}
            onChange={handleChange}
          />
        </label>
        {errors.spotify && <p>{errors.spotify}</p>}

        <label>
          Instagram
          <input
          className="input-field"
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
        </label>
        {errors.instagram && <p>{errors.instagram}</p>}

        <label>
          Website
          <input
          className="input-field"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </label>
        {errors.website && <p>{errors.website}</p>}

        <label>
          Facebook
          <input
          className="input-field"
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </label>
        {errors.facebook && <p>{errors.facebook}</p>}

        <label>
          Profile Image URL
          <input
          className="input-field"
            type="text"
            name="profile_img_url"
            value={formData.profile_img_url}
            onChange={handleChange}
          />
        </label>
        {errors.profile_img_url && <p>{errors.profile_img_url}</p>}

        <label>
          Banner Image URL
          <input
          className="input-field"
            type="text"
            name="banner_img_url"
            value={formData.banner_img_url}
            onChange={handleChange}
          />
        </label>
        {errors.banner_img_url && <p>{errors.banner_img_url}</p>}

        <label>
          Background Image URL
          <input
          className="input-field"
            type="text"
            name="background_img_url"
            value={formData.background_img_url}
            onChange={handleChange}
          />
        </label>
        {errors.background_img_url && <p>{errors.background_img_url}</p>}

        <button className="form-button" type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
