import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import { deleteAlbum, fetchCurrUserAlbums } from "../../redux/albumReducer";
import { fetchOrders } from "../../redux/orderReducer";
import { fetchTracksbyAlbumId } from "../../redux/tracks" ;
// import { useModal } from "../../context/Modal";

import "./UserHome.css";

function UserHome() {
    const dispatch = useDispatch();
    //   const { closeModal } = useModal();
    //   const ulRef = useRef();
    const user = useSelector((state) => state.session.user);
    let albums = useSelector((state) => state.album);
    let tracks = useSelector((state) => state.track);
    let purchases;
    // const [showModal, setShowModal] = useState(false);
    // const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    // const filteredPurchases = Object.values(purchases).filter(purchase => purchase.user_id === user.id) ;
    const filteredAlbums = Object.values(albums)?.filter(item => item.user_id === user.id);
    let [selectedAlbumId, setSelectedAlbumId] = useState(null);
    // const filteredTracks = filteredAlbums.tracks.map(track => track.id)
    
    const filteredTracks = filteredAlbums.flatMap(album => album.tracks);

    console.log(filteredTracks);
    
    useEffect(() => {
        if (user) {
            dispatch(fetchCurrUserAlbums());
            dispatch(fetchOrders());
        } else {
            dispatch(fetchOrders());
        }
    }, [dispatch, user]);

    // useEffect(() => {
    //     if (filteredAlbums.length > 0) {
    //         setSelectedAlbumId(filteredAlbums[0].id)
    //         dispatch(fetchTracksbyAlbumId(selectedAlbumId));
    //     } else  {
    //         setSelectedAlbumId(null)
    //     }
    // }, [dispatch])

    const handleAlbumClick = (albumId) => {
        if (albumId !== selectedAlbumId) {
            setSelectedAlbumId(albumId);
        }
    };

    // useEffect(() => {
    // if (filteredAlbums.length > 0) {
    //     const firstAlbumId = filteredAlbums[0].id;
    //     setSelectedAlbumId(firstAlbumId);
    //     dispatch(fetchTracksbyAlbumId(firstAlbumId));
    // }
    // }, [dispatch, filteredAlbums]);



    // if (!filteredAlbums || Object.values(filteredAlbums).length === 0) {
    //     return <div>No albums found for this user.</div>;
    // }


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
        if (albumId === selectedAlbumId) {
            const newSelectedAlbumId = filteredAlbums[0]?.id || null;
            if (newSelectedAlbumId) {
                dispatch(fetchTracksbyAlbumId(newSelectedAlbumId));
            }
        }
    };


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

  return filteredAlbums.length > 0? (
    <>
    <div className="uh-container">
      <img id="background-image" alt="background" />
      <section className="UHsection1">
        <div className="banner-container">
          <img className="banner-img" src={user.banner_img_url} alt="banner" />
        </div>

        <div className="profile-details-container">
          <img className="profile-img" src={user.profile_img_url} alt="profile" />
          <div className="profile-username">{user.username}</div>
        </div>
      </section>

      <section className="header-container">
        <h1 className="profile-header">Manage Products</h1>
      </section>

      <section >
        <div className="user-container">
          <div className="album-list-container">
            {Object.values(filteredAlbums).map((album) => (
              <div key={album.id} onClick={() => handleAlbumClick(album.id)}>
                <div className="album-card">
                  <img
                    className="UH-CMImg"
                    src={album.cover_image_url}
                    alt={`${album.title} cover`}
                  />
                  <div className="UH-album-data-container">
                    <p className="UH-data-container-album">{album.title}</p>
                    <p className="UH-data-container-artist">{`by ${album.band}`}</p>
                    <p className="UH-data-container-tag">{album.tags}</p>
                  </div>

                  <div className="button-group-update">
                    <NavLink to={`/albums/${album.id}/edit-albums`}>
                      <button className="update-button">Update</button>
                    </NavLink>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(album.id)}
                    >
                      Delete
                    </button>
                  </div>

                  {/* Render the tracks for the current album */}
                  {album.tracks && album.tracks.length > 0 && (
                    <div className="tracks-card">
                      <p>Album Track list</p>
                      {album.tracks.map((track) => (
                        <div className="track-item" key={track.id}>
                         <i className="fa-regular fa-circle-play"></i>
                          <p className="track-name">{track.name}</p>
                          <p className="track-duration">{track.duration} s</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="right-side-container">
  <h2>Purchase History</h2>
  {purchases && purchases.length > 0 ? (
    <ul className="purchase-list">
      {purchases.map((purchase) => (
        <li className="purchase-item" key={purchase.id}>
          <p className="purchase-type">{purchase.type}</p>
          <p className="purchase-quantity">{purchase.quantity}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p></p>
  )}
</div>

        </div>
      </section>
    </div>
  </>
    ) : (
    <div className="uh-container">
        <img id="background-image"></img>
        <section className="UHsection1">
            <div className="banner-container">
                <img
                className="banner-img"
                src={user.banner_img_url}
                />
            </div>

            <div className='profile-details-container'>
                <img
                className="profile-img"
                src={user.profile_img_url}
                />
            <div className="profile-username">{user.username}</div>
            </div>
        </section>

        <h1 className='profile-header'>
        Manage Products
        </h1>

        <section>
            <div className="purchase-wishlist-container">
                <p>Purchase History</p>
                {/* {Object.values(filteredPurchases).map((purchase) => (
                    <li className="purchase-items" key={purchase.id}>
                        <p className="purchase-type">{purchase.type}</p>
                        <p className="purchase-quantity">{purchase.quantity}</p>
                    </li>
                ))} */}
            </div>
        </section>
    </div>
  );
}

export default UserHome;

