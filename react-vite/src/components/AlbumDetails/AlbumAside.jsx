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
                        <img className="ADasideImg" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampUserProfileImg.jpg?alt=media&token=949d5249-d3c3-4e79-a385-4f3e0774c6bc" />
                        <div>Artist/Band Name</div>
                        <div>{album[albumId].band}</div>

                        <div>Artist City</div>
                        <div>Artist Country</div>
                    </div>
                    <div>
                    <div>Artist Website</div>
                    <div>Discography</div>

                    </div>
                    {album && album[albumId].UserAlbums.map((album, index) => (
                    <div key={index}>
                    <img className="ADasideDiscoImgs" src={album.cover_image_url}/>
                    <div>{album.title}</div>
                    <div>{`Released ${album.created_at.split(" ")[2]} ${album.created_at.split(" ")[3]} `}</div>

                </div>
                    ))}
        </>
    )
}

export default AlbumAside
