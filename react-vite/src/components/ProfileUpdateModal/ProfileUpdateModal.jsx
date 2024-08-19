import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateUserProfile, thunkDeleteUser } from "../../redux/session";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./ProfileUpdateModal.css";

function ProfileUpdateModal({ user }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        city: user.city || "",
        state: user.state || "",
        email: user.email || "",
        username: user.username || "",
        bio: user.bio || "",
        spotify: user.spotify || "",
        instagram: user.instagram || "",
        website: user.website || "",
        facebook: user.facebook || "",
        profile_img_url: user.profile_img_url || "",
        banner_img_url: user.banner_img_url || "",
        background_img_url: user.background_img_url || ""
    });
    const [errors, setErrors] = useState({});
    const [deleteErrors, setDeleteErrors] = useState({});


    const { closeModal } = useModal();
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(thunkUpdateUserProfile(formData))
        if (serverResponse ) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
          const errors = await dispatch(thunkDeleteUser());
          if (errors) {
            setDeleteErrors(errors);
          } else {
            closeModal();
            navigate("/")
          }
        }
      };



  return (
    <div className="profile-modal">
        <h1>Update your Profile</h1>
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
            {/* {errors.first_name && <p>{errors.first_name}</p>} */}

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
            {/* {errors.last_name && <p>{errors.last_name}</p>} */}

            <label>
            City
            <input
            className="input-field"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                />
            </label>
            {/* {errors.city && <p>{errors.city}</p>} */}

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
            {/* {errors.state && <p>{errors.state}</p>} */}

            <label>
            Email
            <input
            className="input-field"
                type="text"
                name="email"
                value={formData.email}
                readOnly
                required
                />
            </label>
            {/* {errors.email && <p>{errors.email}</p>} */}

            <label>
            Username
            <input
            className="input-field"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                readOnly
                required
                />
            </label>
            {/* {errors.username && <p>{errors.username}</p>} */}

            <label>
            Bio
            <input
            className="input-field"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                />
            </label>
            {/* {errors.bio && <p>{errors.bio}</p>} */}

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
            {/* {errors.spotify && <p>{errors.spotify}</p>} */}

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
            {/* {errors.instagram && <p>{errors.instagram}</p>} */}

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
            {/* {errors.website && <p>{errors.website}</p>} */}

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
            {/* {errors.facebook && <p>{errors.facebook}</p>} */}

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
            {/* {errors.profile_img_url && <p>{errors.profile_img_url}</p>} */}

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
            {/* {errors.banner_img_url && <p>{errors.banner_img_url}</p>} */}

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
            {/* {errors.background_img_url && <p>{errors.background_img_url}</p>} */}
            <div className="profile-update-buttons">
                <button className="submit-button" type="submit">Save Changes</button>
                <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
            </div>
            <div className="delete-button-container">
                {user.id !== 1? (
                    <button onClick={handleDelete} className="profile-delete-button">Delete User</button>
                ): null}
            </div>
            {deleteErrors.server && (<p className="error-message">{deleteErrors.server}</p>)}
        </form>
    </div>
  );
}

export default ProfileUpdateModal;
