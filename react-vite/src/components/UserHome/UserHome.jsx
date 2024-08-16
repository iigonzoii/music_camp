import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import { deleteAlbum, fetchCurrUserAlbums } from "../../redux/albumReducer";
// import { useModal } from "../../context/Modal";

import "./UserHome.css";

function UserHome() {
  const dispatch = useDispatch();
//   const { closeModal } = useModal();
//   const ulRef = useRef();
  const user = useSelector((state) => state.session.user);
  let albums = useSelector((state) => state.album);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedAlbumId, setSelectedAlbumId] = useState(null);
const filteredAlbums = Object.values(albums).filter(item => item.user_id === user.id);

useEffect(() => {
    if (user) {
      dispatch(fetchCurrUserAlbums());
    }
  }, [dispatch, user]);

  if (!filteredAlbums || Object.values(filteredAlbums).length === 0) {
    return <div>No albums found for this user.</div>;
  }


//   useEffect(() => {
//     if (!showModal) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowModal(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showModal]);

  const handleDelete = (albumId) => {
    dispatch(deleteAlbum(albumId));
  };

  if (!filteredAlbums) {
    return <div>Loading...</div>;
  }

//   const handleDeleteModal = (albumId) => {
//     setSelectedAlbumId(albumId);
//     setShowModal(true);
//   };

//   const handleConfirmDelete = () => {
//     dispatch(deleteAlbum(selectedAlbumId))
//       .then(() => {
//         setShowModal(false);
//         setSelectedAlbumId(null);
//       })
//       .catch((err) => {
//         console.error("Error deleting album:", err);
//       });
//   };

//   const handleCancelDelete = () => {
//     setShowModal(false);
//     setSelectedAlbumId(null);
//   };

  return (
    <div>
      {/* className="UHcontainer" */}
      <section className="UHsection1">
        <img
          className="UHBannerImg"
          src='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampBand.jpg?alt=media&token=70d07189-3781-4ddd-a803-da95edc9e302'
        />
        <img
          className="UHmainImg"
          src={user.profile_image_url}
        />

        <div>UserName</div>
      </section>
      <section className="UHsection2">
        <div className="user-container">
          <h1>
            Manage Products for {user.firstName} {user.lastName}
          </h1>
          <div className="album-card">
            {Object.values(filteredAlbums).map((album) => (
              <div key={album.id}>
                <img
                  className="CMImg"
                  src={album.cover_image_url}
                  alt={`${album.title} cover`}
                />
                <div className="album-data-container">
                  <p className="data-container-item">{album.title}</p>
                  <p className="data-container-item">{`by ${album.band}`}</p>
                  <p className="data-container-item bottom-item">
                    {album.tags}
                  </p>
                </div>

                <div className="button-group-update">
                  <NavLink to={`/albums/${album.id}/edit-albums`}>
                    <button className="update-button">Update</button>
                  </NavLink>
                  <button
                    className="update-button"
                    onClick={() => handleDelete(album.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* {showModal && (
            <ConfirmDeleteSpotModal
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )} */}
        </div>
      </section>
    </div>
  );
}

export default UserHome;
