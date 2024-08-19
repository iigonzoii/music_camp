import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import { fetchAlbums, deleteAlbum, fetchCurrUserAlbums } from "../../redux/albumReducer";
import { fetchOrders } from "../../redux/orderReducer";
import { fetchTracksbyAlbumId } from "../../redux/tracks" ;
import OpenModalButton from "../OpenModalButton";
import ProfileUpdateModal from "../ProfileUpdateModal";
import UserCollectionProp from "./UserCollection";
import "./UserHome.css";

function UserHome() {
    const dispatch = useDispatch();
    //   const { closeModal } = useModal();
    //   const ulRef = useRef();
    const user = useSelector((state) => state.session.user);
    let albums = useSelector((state) => state.album);
    let tracks = useSelector((state) => state.track);
    const collection = useSelector((state) => state.order.allOrders)
    // let purchases = useSelector((state) => state.orders.allOrders)
    // const [showModal, setShowModal] = useState(false);
    // const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    // const filteredPurchases = Object.values(purchases).filter(purchase => purchase.user_id === user.id) ;
    let [selectedAlbumId, setSelectedAlbumId] = useState(null);

    useEffect(() => {
        if (user) {
            dispatch(fetchCurrUserAlbums());
            dispatch(fetchOrders());
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (albums && Object.values(albums).length > 0) {
            const firstAlbumId = Object.values(albums)[0].id;
            setSelectedAlbumId(firstAlbumId);
            dispatch(fetchTracksbyAlbumId(firstAlbumId));
        } else {
            setSelectedAlbumId(null);
        }
    }, [dispatch, albums]);

    const handleAlbumClick = (albumId) => {
        if (albumId !== selectedAlbumId) {
            setSelectedAlbumId(albumId);
            dispatch(fetchTracksbyAlbumId(albumId));
        }
    };

    const handleDelete = (albumId) => {
        dispatch(deleteAlbum(albumId));
        if (albumId === selectedAlbumId) {
            const remainingAlbums = Object.values(albums).filter(album => album.id !== albumId);
            const newSelectedAlbumId = remainingAlbums[0]?.id || null;
            setSelectedAlbumId(newSelectedAlbumId);
            if (newSelectedAlbumId) {
                dispatch(fetchTracksbyAlbumId(newSelectedAlbumId));
            } else {
                setSelectedAlbumId(null);
            }
        }
    };

    const filteredAlbums = Object.values(albums)?.filter(item => item.user_id === user.id);

    const filterAlbumById = (id) => {
        const payload = Object.values(albums).filter(album => album.id === id);
        return payload
    }

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

  return user ? (
    <div className="uh-container">
        <img id="background-image"></img>
      {/* className="UHcontainer" */}
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
            <div className="edit-profile-button-container">
                <OpenModalButton
                    buttonText="Edit Profile"
                    modalComponent={<ProfileUpdateModal user={user} />}
                />
            </div>
        </div>
      </section>

      <section className="header-container">
            <h1 className='profile-header'>
            Manage Products
            </h1>
      </section>

      <div className='product-labels'>
        <h2>My Albums</h2>
        <h2>My Collection</h2>
      </div>

      <section className="UHsection2">
        <div className="user-container">
          <div className="album-list-container">
            {Object.values(filteredAlbums).length < 1 ? <p>Add your music!</p>
                :
            Object.values(filteredAlbums).map((album) => (
               <div key={album.id} onClick={() => handleAlbumClick(album.id)}>
                 <div className="album-card" >
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
                 </div>
              </div>
            ))}
           </div>
            <div className='tracks-card'>
                {Object.values(tracks)
                    .filter((track) => track.album_id === selectedAlbumId)
                    .map(track => (
                        <div className="track-item" key={track.id}>
                            <p className="track-name">{track.name}</p>
                            <p className="track-duration">{track.duration} s</p>
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
        {Object.values(collection).length < 1 ? <p className='empty-collection'>No purchases here</p>
                :
            <div className='user-collection'>
                {Object.values(collection).map(order => (
                    <div className="collection-item" key={order.id}>
                        <UserCollectionProp albumData={filterAlbumById(order.album_id)} orderData={order}/>
                    </div>
                ))}
            </div>
            }
            <div className='profile-details-container'>
                <img
                className="profile-img"
                src={user.profile_img_url}
                />
                <div className="profile-username">{user.username}</div>

                <div className="edit-profile-button">
                    <OpenModalButton
                        buttonText="Edit Profile"
                        modalComponent={<ProfileUpdateModal user={user} />}
                    />
                </div>
            </div>
        </section>

    </div>
  ) : (<p></p>);
}

export default UserHome;
