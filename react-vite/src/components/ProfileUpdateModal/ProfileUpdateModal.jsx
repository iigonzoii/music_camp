import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateUserProfile } from "../../redux/session";
import { useModal } from "../../context/Modal";


function ProfileUpdateModal({ user }) {
  const dispatch = useDispatch();
//   const user = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [city, setCity] = useState(user.city || "");
  const [state, setState] = useState(user.state || "");
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [spotify, setSpotify] = useState(user.spotify || "");
  const [instagram, setInstagram] = useState(user.instagram || "");
  const [website, setWebsite] = useState(user.website || "");
  const [facebook, setFacebook] = useState(user.facebook || "");
  const [profileImgUrl, setProfileImgUrl] = useState(user.profile_img_url || "");
  const [bannerImgUrl, setBannerImgUrl] = useState(user.banner_img_url || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      city,
      state,
      username,
      bio,
      spotify,
      instagram,
      website,
      facebook,
      profile_img_url: profileImgUrl,
      banner_img_url: bannerImgUrl,
    };

    const response = await dispatch(thunkUpdateUserProfile(updatedUser));
    if (response) {
      closeModal();
    }
  };

  return (
    <div className="edit-profile-modal">
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileUpdateModal;
