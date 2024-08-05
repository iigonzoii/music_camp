import "./AlbumDetails.css"
function MajorityDetails() {

    return (
        <>
        <div className="ADalbumData">
                    sub container left
                    <p>album title</p>
                    <p>by user.username</p>
                    <div className="V2Play">version2 play button and song</div>
                    <p>Product Type</p>
                    <button>Buy Product.Type</button>
                    <p>album.description</p>

                    <ol className="ADtrackList">
                        <li>trackname track duration</li>
                        <li>trackname track duration</li>
                        <li>trackname track duration</li>
                    </ol>
                    <p>produced by</p>
                    <p>Released `Release Date`</p>
                </div>

                <div className="ADalbumArea">

                    <img src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampRockAlbumCover.jpg?alt=media&token=3d36d4a9-7fab-4f37-ac7d-e677d5a94495" />

                    <p><i className="fa-regular fa-heart pointer "></i>wishlist</p>
                    <p>Supported by</p>
                    <ul>
                        <li>reviewer profile image and their review</li>
                        <li>reviewer profile image and their review</li>
                        <li>reviewer profile image and their review</li>
                        <li>reviewer profile image and their review</li>
                        <li>Version 2 probably make this box scroll and seethrough to show the background img?</li>
                    </ul>
                    <div className="ADv2supporters">
                    Version2 where we showed a tiled list of supporters profile images
                    </div>

                </div>
        </>
    )
}

export default MajorityDetails
