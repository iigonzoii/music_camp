// import { useEffect, useState} from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import "./AlbumDetails.css"

function AlbumAside() {
    const { albumId } = useParams();
    let album = useSelector(state => state.album);

    return  (
        <>
        <div>
            <img className="ad-aside-img" src={album[albumId].UserInfo[0].profile_img_url} />
            <div>{album[albumId].Album.band}</div>
            <div>{album[albumId].UserInfo[0].city}</div>
            <div>{album[albumId].UserInfo[0].state}</div>
        </div>
        <div>
            <div>{album[albumId].UserInfo[0].website}</div>
            <div>Discography</div>
        </div>
            {album && album[albumId].UserAlbums.map((album, index) => (
            <div key={index}>
            <img className="ad-aside-disco-imgs" src={album.cover_image_url}/>
            <div>{album.title}</div>
            <div>{`Released ${album.created_at.split(" ")[2]} ${album.created_at.split(" ")[3]} `}</div>
        </div>
            ))}
        </>
    )
}

export default AlbumAside
