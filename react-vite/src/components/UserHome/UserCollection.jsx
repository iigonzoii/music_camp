import './UserHome.css'

function UserCollectionProp({albumData, orderData}) {
    const album = Object.values(albumData)[0]

    if (!album) return (<p>Loading...</p>)
    return (
        <div key={orderData.id}>
                <div className="collection-card" >
                    <img
                        className="collection-img"
                        src={album.cover_image_url}
                        alt={`${album.title} cover`}
                    />
                    <div className="collection-data-container">
                    <p className="collection-album">{album.title} ({orderData.type})</p>
                    <p className="collection-detail">{`by ${album.band}`}</p>
                    <p className="collection-detail">{album.tags}</p>
                    <p className="collection-detail">Quantity: {orderData.quantity}</p>
                    <p className="collection-detail">Purchase price: {orderData.price}</p>
                    </div>
                </div>
            </div>
    )
}

export default UserCollectionProp
