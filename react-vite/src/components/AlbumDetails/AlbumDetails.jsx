import MajorityDetails from "./MajorityDetails"
import "./AlbumDetails.css"

// todo top container
//*
// todo left container
//* two inner containers labeled with data of some sort
//* within each sub container create element placeholders for said data
// todo right container
//* flex column and seperate data groups into divs
// todo top container element placement
// todo left container inner container

function AlbumDetails() {

    return (
        <div className="ADbody">
            <section className="ADsection1">

                    <img className="ADbanner" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampBackground.jpg?alt=media&token=df57940f-056e-468f-aae7-dfe860753847"/>

            </section>

            <div className="ADcontainer">
                <section className="ADsection2">
                    <MajorityDetails />
                </section>

                <aside className="ADsection3">
                    section 3
                  <img className="ADasideImg" src="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampUserProfileImg.jpg?alt=media&token=949d5249-d3c3-4e79-a385-4f3e0774c6bc"/>
                  <div></div>
                  <div></div>
                  <div></div>
                </aside>
            </div>
        </div>
    )
}


export default AlbumDetails
