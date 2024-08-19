import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import { fetchAlbums, deleteAlbum, fetchCurrUserAlbums } from "../../redux/albumReducer";
import { fetchOrders } from "../../redux/orderReducer";
import { fetchTracksbyAlbumId } from "../../redux/tracks" ;
// import OpenModalButton from "../OpenModalButton";
// import ProfileUpdateModal from "../ProfileUpdateModal";
import UserCollectionProp from "./UserCollection";
import "./UserHome.css";

function UserHome() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    let albums = useSelector((state) => state.album);
    let tracks = useSelector((state) => state.track);
    const collection = useSelector((state) => state.order.allOrders)
    // let purchases = useSelector((state) => state.orders.allOrders)
    // const [showModal, setShowModal] = useState(false);
    // const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    // const filteredPurchases = Object.values(purchases).filter(purchase => purchase.user_id === user.id) ;
    const filteredAlbums = Object.values(albums)?.filter(item => item.user_id === user.id);
    let [selectedAlbumId, setSelectedAlbumId] = useState(null);
    // const filteredTracks = filteredAlbums.tracks.map(track => track.id)

    useEffect(() => {
        if (user) {
            dispatch(fetchCurrUserAlbums());
            dispatch(fetchOrders());
            dispatch(fetchAlbums())
        } else {
            dispatch(fetchOrders());
        }
    }, [dispatch, user]);

    const handleAlbumClick = (albumId) => {
        if (albumId !== selectedAlbumId) {
            setSelectedAlbumId(albumId);
        }
    };

    const filterAlbumById = (id) => {
      const payload = Object.values(albums).filter(album => album.id === id);
      return payload
    }

    const handleDelete = (albumId) => {
        dispatch(deleteAlbum(albumId));
        if (albumId === selectedAlbumId) {
            const newSelectedAlbumId = filteredAlbums[0]?.id || null;
            if (newSelectedAlbumId) {
                dispatch(fetchTracksbyAlbumId(newSelectedAlbumId));
            }
        }
    };

  return (
    <div className="uh-container">
      <img id="background-image"/>

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
              ))
            }
          </div>
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

      </section>
    </div>

  );
}

export default UserHome;
