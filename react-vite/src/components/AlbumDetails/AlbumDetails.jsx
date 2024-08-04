import MajorityDetails from "./MajorityDetails"
import "./AlbumDetails.css"

// todo section three aside align the content properly
// * I think instead of aligning items center, we should probably align the content at flex start/left and then mess with the width settings or put margin auto so we get a centered position while keeping the text in line with the divs above it
//* may have to put each small section into divs idk

function AlbumDetails() {

    return (
        <div className="ADbody">
            <section className="ADsection1">

                <img className="ADbanner" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampBackground.jpg?alt=media&token=df57940f-056e-468f-aae7-dfe860753847" />

            </section>

            <div className="ADcontainer">
                <section className="ADsection2">
                    <MajorityDetails />
                </section>

                <aside className="ADsection3">

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
                </aside>
            </div>
        </div>
    )
}


export default AlbumDetails
