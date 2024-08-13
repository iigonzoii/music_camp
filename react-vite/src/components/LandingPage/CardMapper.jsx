import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./CardMapper.css"


function CardMapper({ genre, cat }) {
    const navigate = useNavigate();

    let albums = useSelector(state => state.album);
    albums = Object.values(albums);
    let filteredAlbums = albums



    function filterAlbums(genre, cat) {
        // Apply genre filter if genre is provided
        if (genre && genre !== "all-genres") {
            filteredAlbums = filteredAlbums.filter(album => album.genre === genre);
        }

        // Apply category filter if cat is provided
        if (cat && cat !== 'all-categories') {
            filteredAlbums = filteredAlbums
                .map(album => {
                    return {
                        ...album,
                        products: album.products.filter(
                            product => product.type === cat
                        )
                    };
                })
                .filter(album => album.products.length > 0);
        }

        return filteredAlbums;
    }

    albums = filterAlbums(genre, cat);

    console.log(albums);

    return (
        <div className="CMcontainer">
            {albums && albums.map((album, index) => (
                <div className='pointer'
                    title={`${album.title}`}
                    onClick={() => navigate(`/albums/${album.id}`)}
                    key={index}>
                    <img className="CMImg" src={album.cover_image_url} alt={`${album.title} cover`} />
                    <div className="album-data-container">
                        <p className='data-container-item'>{album.title}</p>
                        <p className='data-container-item'>{`by ${album.band}`}</p>
                        <p className='data-container-item bottom-item'>{album.tags}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardMapper;


// // import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import "./CardMapper.css"

// function CardMapper({genre, cat}) {
//     const navigate = useNavigate();

//     let albums = useSelector(state => state.album);
//     albums = Object.values(albums)

//     function genreFilter(genre) {
//         if (genre === "all-genres") return albums
//         let result = albums.filter((album) => album.genre === genre)
//         return result
//     }
//     albums = genreFilter(genre)


//     const filteredAlbums = albums.filter(album => album.product_types);


//     const catFilter = filteredAlbums.map(album => {
//         return {
//           ...album,
//           product_types: album.product_types.filter(product => product.type === cat)
//         };
//       }).filter(album => album.product_types.length > 0);




//     return (
//         <div className="CMcontainer">
//             {albums && albums.map((album, index) => (
//                 <div className='pointer'
//                 title={`${album.title}`}
//                 onClick={() => navigate(`/albums/${album.id}`)}
//                     key={index}>
//                     <img className="CMImg" src={album.cover_image_url} />
//                     <div className="spot-data-container">
//                             <p>{album.title}</p>
//                         <p>{`by ${album.band}`}</p>
//                             <p>{(album.tags)}</p>
//                             </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default CardMapper




// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "./CardMapper.css";

// function CardMapper({ genre, cat }) {
//   const navigate = useNavigate();

//   // Select albums from the Redux store
//   let albums = useSelector((state) => state.album);
//   albums = Object.values(albums);  // Convert the albums object to an array

//   let filteredAlbums = albums;

//   // Filter by genre if provided
//   if (genre && genre !== "all-genres") {
//     filteredAlbums = filteredAlbums.filter((album) => album.genre === genre);
//   }

//   // Filter by category if provided
//   if (cat) {
//     filteredAlbums = filteredAlbums
//       .filter((album) => album.product_types)  // Ensure album has product_types
//       .map((album) => ({
//         ...album,
//         product_types: album.product_types.filter(
//           (product) => product.type === cat
//         ),
//       }))
//       .filter((album) => album.product_types.length > 0);
//   }

//   console.log({filteredAlbums})
//   // Render the filtered albums
//   return (
//     <div className="CMcontainer">
//       {filteredAlbums.map((album, index) => (
//         <div
//           className="pointer"
//           title={`${album.title}`}
//           onClick={() => navigate(`/albums/${album.id}`)}
//           key={index}
//         >
//           <img className="CMImg" src={album.cover_image_url} alt={album.title} />
//           <div className="spot-data-container">
//             <p>{album.title}</p>
//             <p>{`by ${album.band}`}</p>
//             <p>{album.tags}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CardMapper;
