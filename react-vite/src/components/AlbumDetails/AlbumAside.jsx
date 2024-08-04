import "./AlbumDetails.css"

function AlbumAside() {

    return (
        <>
        <div>
                        <img className="ADasideImg" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampUserProfileImg.jpg?alt=media&token=949d5249-d3c3-4e79-a385-4f3e0774c6bc" />
                        <div>Artist/Band Name</div>
                        <div>Artist City</div>
                        <div>Artist Country</div>
                    </div>
                    <div>
                    <div>Artist Website</div>
                    <div>Discography</div>
                    </div>
                        {/* map function to go over album details and build this, include the div above and below img */}
                    <div>
                        <img className="ADasideDiscoImgs" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampElectronicAlbumCover.jpg?alt=media&token=3f64c61d-5852-4c61-a080-7736041cc47d"/>
                        <div>Album Title</div>
                        <div>Album Date</div>
                    </div>
                    <div>
                        <img className="ADasideDiscoImgs" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampElectronicAlbumCover.jpg?alt=media&token=3f64c61d-5852-4c61-a080-7736041cc47d"/>
                        <div>Album Title</div>
                        <div>Album Date</div>
                    </div>
                    <div>
                        <img className="ADasideDiscoImgs" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampElectronicAlbumCover.jpg?alt=media&token=3f64c61d-5852-4c61-a080-7736041cc47d"/>
                        <div>Album Title</div>
                        <div>Album Date</div>
                    </div>
        </>
    )
}

export default AlbumAside
