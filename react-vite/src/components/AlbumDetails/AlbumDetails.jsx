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
        <>
        <section className="ADsection1">
ay ay shawtayyyy
        </section>

        <div className="ADcontainer">
            <section className="ADsection2">

                <div className="ADalbumData">
                    sub container left
                    <p>album title</p>
                    <p>by user.username</p>
                    <div className="V2Play">version2 play button and song</div>
                    <p>Product Type</p>
                    <button>Buy Product.Type</button>
                    <p>album.description</p>

                    <ol className="ADtrackList">
                        <li className="test">trackname track duration</li>
                        <li className="test">trackname track duration</li>
                        <li className="test">trackname track duration</li>
                    </ol>
                    <p>produced by</p>
                    <p>Released `Release Date`</p>
                </div>

                <div className="ADalbumArea">
                sub container right
                </div>

            </section>

            <aside className="ADsection3">
section 3
            </aside>
        </div>
        </>
    )
}


export default AlbumDetails
