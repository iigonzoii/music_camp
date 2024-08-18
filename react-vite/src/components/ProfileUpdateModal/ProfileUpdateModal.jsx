import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateUserProfile } from "../../redux/session";
import { useModal } from "../../context/Modal";

function ProfileUpdateModal({ user }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [city, setCity] = useState(user.city || "");
  const [state, setState] = useState(user.state || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [spotify, setSpotify] = useState(user.spotify || "");
  const [instagram, setInstagram] = useState(user.instagram || "");
  const [website, setWebsite] = useState(user.website || "");
  const [facebook, setFacebook] = useState(user.facebook || "");
  const [profileImgUrl, setProfileImgUrl] = useState(user.profile_img_url || "");
  const [bannerImgUrl, setBannerImgUrl] = useState(user.banner_img_url || "");
  const [backgroundImgUrl, setBackgroundImgUrl] = useState(user.background_img_url || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      city,
      state,
      email,
      username,
      bio,
      spotify,
      instagram,
      website,
      facebook,
      profile_img_url: profileImgUrl,
      banner_img_url: bannerImgUrl,
      background_img_url: backgroundImgUrl
    };

    const response = await dispatch(thunkUpdateUserProfile(updatedUser));
    if (response) {
      closeModal();
    }
  };

  return (
    <div className="profile-modal">
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Bio
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label>
          Spotify
          <input
            type="text"
            value={spotify}
            onChange={(e) => setSpotify(e.target.value)}
          />
        </label>
        <label>
          Instagram
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </label>
        <label>
          Website
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
        <label>
          Facebook
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </label>
        <label>
          Profile Image URL
          <input
            type="url"
            value={profileImgUrl}
            onChange={(e) => setProfileImgUrl(e.target.value)}
          />
        </label>
        <label>
          Banner Image URL
          <input
            type="url"
            value={bannerImgUrl}
            onChange={(e) => setBannerImgUrl(e.target.value)}
          />
        </label>
        <label>
          Background Image URL
          <input
            type="url"
            value={backgroundImgUrl}
            onChange={(e) => setBackgroundImgUrl(e.target.value)}
          />
        </label>
        <button className="save-button" type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileUpdateModal;
